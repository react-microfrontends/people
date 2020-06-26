import React, { Fragment } from "react";
import { imageMap } from "./film.helpers.js";

export default class Film extends React.Component {
  state = {
    showOverlay: false,
  };

  render() {
    const { film } = this.props;
    return (
      <div
        className="w-48 h-64 flex m-2 align-center justify-center relative"
        onMouseEnter={this.mouseOn}
        onMouseLeave={this.mouseOut}
      >
        <img
          className="p-1 object-contain"
          src={imageMap[film.episode_id]}
          alt={film.title}
        />
        {this.state.showOverlay && (
          <div className="absolute flex items-center h-full w-full bg-overlay text-black rounded">
            <div className="w-full px-4">
              <div className="text-center border-b border-black">
                <div>Directed By</div>
                <div className="font-bold">{film.director}</div>
              </div>
              <div className="text-center border-b border-black">
                <div>Released on</div>
                <div className="font-bold">{film.release_date}</div>
              </div>
              <div className="text-center">
                <div>Produced by</div>
                <div className="font-bold">{film.producer}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  mouseOn = () => {
    this.setState({ showOverlay: true });
  };

  mouseOut = () => {
    this.setState({ showOverlay: false });
  };
}
