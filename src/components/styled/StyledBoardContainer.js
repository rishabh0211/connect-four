import styled from "styled-components";
import { media } from "../../styles/media";

export default styled.section`
  max-width: 70rem;
  margin: 2rem auto 4rem;
  .heading-container {
    text-align: center;
    .heading {
      text-transform: uppercase;
      letter-spacing: .5rem;
      font-size: 4.8rem;
      background-image: linear-gradient(to right, #FF5722, #c7ba3f);
      display: inline-block;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;

      ${media.tablet`
        font-size: 3rem;
      `}
    }
  }

  .inputs-container {
    display: flex;
    margin-top: 1rem;

    *:not(:first-child) {
      margin-left: 1rem;
    }

    input {
      border: none;
      border-bottom: solid 1px #276b8e;
      padding: 1rem;
      font-size: 1.6rem;
      width: 8rem;
    }
  }

  .bottom-container {
    display: flex;
  }
  .btn {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    text-transform: uppercase;
    border: #276b8e solid 1px;
    color: #000;
    background: #fff;
    transition: all .3s;

    &:hover {
      background: #1c6a93ba;
      color: #ffffff;
    }
  }
  .legend {
    display: inline-flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-top: 1rem;
    .legend-attr {
      position: relative;
      font-size: 2rem;
      &::after {
        content: "";
        height: 2rem;
        width: 4rem;
        position: absolute;
        left: calc(100% + 2rem);
      }

      &.legend-red {
        &::after {
          background: #F52525;
        }
      }
      &.legend-yellow {
        margin-top: 1rem;
        &::after {
          background: yellow;
        }
      }
    }
  }
  .btn-container {
    margin-left: 10rem;
    flex-grow: 1;
    .win-msg {
      font-size: 2.4rem;
      text-transform: uppercase;
    }
    .btn {
      padding: 1rem 2rem;
      background: #276b8e;
      color: #ffffff;
      text-transform: uppercase;
    }
  }
`;

export const StyledBoard = styled.div`
  width: ${props => `${props.width}rem`};
  height: ${props => `${props.width * props.rows / props.cols}rem`};
  background: #276b8e;
  display: grid;
  grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
  grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
  position: relative;
  margin-top: 15rem;
  margin: 15rem auto 5rem;

  ${media.tablet`
    margin: 2rem auto;
  `}

  &::before {
    content: " ";
    position: absolute;
    height: ${props => `${props.width / props.cols - 1}rem`};
    width: ${props => `${props.width / props.cols - 1}rem`};
    background: ${props => props.currentPlayer === 1 ? "#F52525" : "yellow"};
    top: ${props => `-${props.width / props.cols}rem`};
    border-radius: 50%;
    left: ${props => `${(props.activeHovered * props.width / props.cols)}rem`};
    transition: left .3s ease-out, background .2s ease-in-out;
    display: block;
    ${props => props.winner && { content: "none" }};

    ${media.tablet`
      content: none;
    `}
  }
`;

export const StyledCell = styled.div`
  position: relative;
  cursor: pointer;
  
  &::before {
    content: " ";
    position: absolute;
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    border-radius: 50%;
    background: white;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

  &::after {
    content: " ";
    position: absolute;
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    border-radius: 50%;
    background: white;
    transform: translate(-50%, -50%);
    left: 50%;
    top: ${props => `calc(-${(props.rowIndex + 1) * 100}% + 4rem)`};
    visibility: hidden;
    opacity: 0;
    transition: top .3s ease-in-out;
  }

  &.active-1 {
    &::after {
      background: #F52525;
      visibility: visible;
      opacity: 1;
      top: 50%;
    }
  }
  &.active-2 {
    &::after {
      background: yellow;
      visibility: visible;
      opacity: 1;
      top: 50%;
    }
  }
`;