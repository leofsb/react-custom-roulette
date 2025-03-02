/* eslint-disable prettier/prettier */
import React, { RefObject, createRef, useEffect } from 'react';

import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp } from '../../utils';

// import { tokenImage } from '../common/images';
interface WheelCanvasProps extends DrawWheelProps {
  width: string;
  height: string;
  data: WheelData[];
}

interface DrawWheelProps {
  outerBorderColor: string;
  outerBorderWidth: number;
  innerRadius: number;
  innerBorderColor: string;
  innerBorderWidth: number;
  radiusLineColor: string;
  radiusLineWidth: number;
  fontSize: number;
  perpendicularText: boolean;
  textDistance: number;
}

// const drawTextAlongArc = (context: any, str: string, centerX: number, centerY: number, radius: number, angle: number, arc: number) => {
//   const len = str.length;
//   let s;
//   context.save();
//   context.translate(centerX, centerY);
//   context.rotate(-1 * (angle + arc / 2));
//   context.rotate(-1 * (arc / len) / 2);
//   for(let n = 0; n < len; n++) {
//     context.rotate(arc / len);
//     context.save();
//     context.translate(0, -1 * radius);
//     s = str[n];
//     context.fillText(s, 0, 0);
//     context.restore();
//   }
//   context.restore();
// }

const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: WheelData[],
  drawWheelProps: DrawWheelProps
) => {
  const QUANTITY = data.length;
  /* eslint-disable prefer-const */
  let {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontSize,
    perpendicularText,
    textDistance,
  } = drawWheelProps;
  /* eslint-enable prefer-const */

  outerBorderWidth *= 2;
  innerBorderWidth *= 2;
  radiusLineWidth *= 2;
  fontSize *= 2;

  const canvas = canvasRef.current;
  if (canvas?.getContext('2d')) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;
    // ctx.translate(0.5, 0.5)

    const arc = Math.PI / (QUANTITY / 2);
    const startAngle = 0;
    const outsideRadius = canvas.width / 2 - 10;

    const clampedTextDistance = clamp(0, 100, textDistance);
    const textRadius = (outsideRadius * clampedTextDistance) / 100;

    const clampedInsideRadius = clamp(0, 100, innerRadius);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.font = `bold ${fontSize}px Helvetica, Arial`;

    for (let i = 0; i < data.length; i++) {
      const angle = startAngle + i * arc;
      const { style } = data[i];
      ctx.fillStyle = (style && style.backgroundColor) as string;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
      ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();

      // WHEEL RADIUS LINES

      // ADAPTATIVE LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      ctx.lineWidth = radiusLineWidth;
      for (let j = 0; j < data.length; j++) {
        const radiusAngle = startAngle + j * arc;
        ctx.beginPath();
        ctx.moveTo(
          centerX ,
          centerY
        );
        ctx.lineTo(
          centerX + (insideRadius - 1) * Math.cos(radiusAngle+ arc/2),
          centerY + (insideRadius - 1) * Math.sin(radiusAngle+ arc/2)
        );
        ctx.moveTo(
          centerX ,
          centerY
        );
        ctx.lineTo(
          centerX + (outsideRadius - 1) * Math.cos(radiusAngle),
          centerY + (outsideRadius - 1) * Math.sin(radiusAngle)
        );
        ctx.closePath();
        ctx.stroke();
      }

      // FIXED LINES
      // ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      // ctx.lineWidth = radiusLineWidth;
      // for (let j = 0; j < 32; j++) {
      //   const radiusAngle = startAngle + j * 2*Math.PI/32;
      //   ctx.beginPath();
      //   ctx.moveTo(
      //     centerX ,
      //     centerY
      //   );
      //   ctx.lineTo(
      //     centerX + (insideRadius - 1) * Math.cos(radiusAngle),
      //     centerY + (insideRadius - 1) * Math.sin(radiusAngle)
      //   );
      //   ctx.closePath();
      //   ctx.stroke();
      // }

      // WHEEL OUTER BORDER
      ctx.strokeStyle =
        outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // WHEEL INNER CIRCLES
      ctx.strokeStyle =
        innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      ctx.lineWidth = innerBorderWidth;
      for (let radius = insideRadius*2/8; radius <= insideRadius; radius+=insideRadius*1/8) {
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();
      }

      // TEXT FILL
      ctx.fillStyle = (style && style.textColor) as string;
      ctx.translate(
        centerX + Math.cos(angle + arc / 2) * textRadius,
        centerY + Math.sin(angle + arc / 2) * textRadius
      );
      const text = data[i].option;
      const textRotationAngle = perpendicularText
        ? angle + arc / 2 + Math.PI / 2
        : angle + arc / 2;
      ctx.rotate(textRotationAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7);
      // ctx.drawImage(tokenImage, 10, 10);
      // drawTextAlongArc(ctx, text, centerX, centerY, textRadius, angle , arc);
      ctx.restore();
    }
  }
};

const WheelCanvas = ({
  width,
  height,
  data,
  outerBorderColor,
  outerBorderWidth,
  innerRadius,
  innerBorderColor,
  innerBorderWidth,
  radiusLineColor,
  radiusLineWidth,
  fontSize,
  perpendicularText,
  textDistance,
}: WheelCanvasProps) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const drawWheelProps = {
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontSize,
    perpendicularText,
    textDistance,
  };

  useEffect(() => {
    drawWheel(canvasRef, data, drawWheelProps);
  }, [canvasRef, data, drawWheelProps]);

  return <WheelCanvasStyle ref={canvasRef} width={width} height={height} />;
};

export default WheelCanvas;
