import React from 'react';
import { Div } from "@vkontakte/vkui";
import '../css/Home.css';

export default function Card({ item: { image, username, age, bio } }) {
  return (
    <>
      <Div style={{ backgroundImage: "url(" + image + ")" }} className="card">
          <Div className="info">
              <h3>{username}, {age} лет</h3>
              <h5>{bio}</h5>
          </Div>
      </Div>
    </>
  );
}
