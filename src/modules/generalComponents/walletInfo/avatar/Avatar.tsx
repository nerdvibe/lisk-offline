import BigNumber from "bignumber.js";
// @ts-ignore
import React from "react";
import sha256 from "js-sha256";
import { Gradients, gradientSchemes } from "./gradients";
import { Wallet } from "../../../../utils/wallet";

export interface Props {
  x: string | number | undefined;
  y: string | number | undefined;
  height: string | number | undefined;
  width: string | number | undefined;
}

const Rect = (props: Props) => <rect {...props} />;
const Circle = (props: Props) => <circle {...props} />;
const Polygon = (props: any) => <polygon {...props} />;

const computeTriangle = (props: any) => ({
  points: [
    {
      x: props.x,
      y: props.y
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 4
    },
    {
      x: props.x + props.size / 4,
      y: props.y + props.size
    }
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(" ")
});

const computePentagon = (props: any) => ({
  points: [
    {
      x: props.x + props.size / 2,
      y: props.y
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 2.5
    },
    {
      x: props.x + (props.size - props.size / 5),
      y: props.y + props.size
    },
    {
      x: props.x + props.size / 5,
      y: props.y + props.size
    },
    {
      x: props.x,
      y: props.y + props.size / 2.5
    }
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(" ")
});

const getShape = (chunk: any, size: any, gradient: any, sizeScale = 1) => {
  const shapeNames = ["circle", "triangle", "square"];

  const sizes = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map(
    x => x * size * sizeScale
  );

  const coordinates = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    x => x * (size / 40)
  );

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + sizes[chunk[3]] / 2,
        cy: coordinates[chunk[2]] + sizes[chunk[3]] / 2,
        r: sizes[chunk[3]] / 2
      }
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]]
      }
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]]
      }
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]]
      })
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]]
      })
    }
  };

  return {
    component:
      // @ts-ignore
      shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].component,
    props: {
      // @ts-ignore
      ...shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].props,
      fill: gradient.url,
      transform: `rotate(${chunk.substr(1, 2) * 3.6}, ${size / 2}, ${size / 2})`
    }
  };
};

const getBackgroundCircle = (size: any, gradient: any) => ({
  component: Circle,
  props: {
    cx: size / 2,
    cy: size / 2,
    r: size / 2,
    fill: gradient.url
  }
});

const pickTwo = (chunk: any, options: any) => [
  options[chunk.substr(0, 2) % options.length],
  options[
    (chunk.substr(0, 2) - 0 + 1 + chunk.substr(2, 2) % (options.length - 1)) %
      options.length
  ]
];

const getHashChunks = (address: any) => {
  // @ts-ignore
  const addressHash = new BigNumber(`0x${sha256(address)}`)
    .toString()
    .substr(3);
  return addressHash.match(/\d{5}/g);
};

export class Avatar extends React.Component {
  shouldComponentUpdate(nextProps: any, state: any) {
    // @ts-ignore
    return nextProps.address !== this.props.address;
  }

  render() {
    // @ts-ignore
    const { address, size, sizeS, className } = this.props;
    const sizeL = size || 200;
    const newSize = sizeL;

    const addressHashChunks = getHashChunks(address);
    const gradientScheme =
      gradientSchemes[
        // @ts-ignore
        addressHashChunks[0].substr(1, 2) % gradientSchemes.length
      ];
    const primaryGradients = pickTwo(
      // @ts-ignore
      addressHashChunks[1],
      gradientScheme.primary
    );
    const secondaryGradients = pickTwo(
      // @ts-ignore
      addressHashChunks[2],
      gradientScheme.secondary
    );
    const shapes = [
      getBackgroundCircle(newSize, primaryGradients[0]),
      // @ts-ignore
      getShape(addressHashChunks[1], newSize, primaryGradients[1], 1),
      // @ts-ignore
      getShape(addressHashChunks[2], newSize, secondaryGradients[0], 0.23),
      // @ts-ignore
      getShape(addressHashChunks[3], newSize, secondaryGradients[1], 0.18)
    ];
    return (
      <svg
        height={newSize}
        width={newSize}
        className={`accountVisual`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Gradients scheme={gradientScheme} />
        {shapes.map((shape, i) => <shape.component {...shape.props} key={i} />)}
      </svg>
    );
  }
}
