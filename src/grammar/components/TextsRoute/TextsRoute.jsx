import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../shared/components/Header/Header.jsx';
import styles from './TextsRoute.module.css';

export default () => (
  <div>
    <Header title="">
      <Link to="/grammar">Fluentcards Grammar</Link>
    </Header>

    <div className={ styles.container }>
      <h2>Source texts</h2>

      <p>The following texts have been used to create the grammar exercises:</p>

      <ul>
        <li>
          Brüder Grimm,
          <span> </span>
          <a href="http://gutenberg.spiegel.de/buch/die-schonsten-kinder-und-hausmarchen-6248/1">
            Die schönsten Kinder- und Hausmärchen
          </a>
        </li>

        <li>
          Johanna Spyri,
          <span> </span>
          <a href="http://gutenberg.spiegel.de/buch/heidis-lehr-und-wanderjahre-5611/1">
            Heidis Lehr- und Wanderjahre
          </a>
        </li>

        <li>
          Franz Kafka,
          <span> </span>
          <a href="http://gutenberg.spiegel.de/buch/franz-kafka-erz-161/1">26 Erzählungen</a>
        </li>

        <li>
          H. G. Wells,
          <span> </span>
          <a href="https://www.gutenberg.org/ebooks/35">
            The Time Machine
          </a>
        </li>

        <li>
          The subtitles for “The Avengers” (2003) from Opensubtitles.org
        </li>

        <li>
          The subtitles for “The Guardians of the Galaxy” (2014) from Opensubtitles.org
        </li>
      </ul>
    </div>
  </div>
);
