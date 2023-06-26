import React, { useState } from 'react';
import axios from 'axios';
import ChartComponent from './Chart';
import { CSVLink } from 'react-csv';

const App = () => {
  const [chartData, setChartData] = useState(null);

  const countWordFrequency = (content) => {
    const words = content.toLowerCase().match(/\b\S+\b/g) || [];
    const wordFrequency = {};

    words.forEach((word) => {
      if (word in wordFrequency) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });

    return wordFrequency;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const content = response.data;
      const wordFrequency = countWordFrequency(content);

      const sortedWordFrequency = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      setChartData({
        labels: Object.keys(sortedWordFrequency),
        values: Object.values(sortedWordFrequency),
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleExport = () => {
    if (chartData) {
      const csvData = Object.entries(chartData.labels).map(([label, value]) => ({
        word: label,
        frequency: value,
      }));

      return csvData;
    }

    return [];
  };

  return (
    <div>
      <h1> TERRIBLY TINY TALES WORD FREQUENCY ANALYZER</h1>
      <button onClick={handleSubmit}>Submit</button>
      {chartData && (
        <>
          <ChartComponent data={chartData} />
          <CSVLink
            data={handleExport()}
            filename={'word_frequency.csv'}
            className="export-button"
            target="_blank"
          >
            <button>Export</button>
          </CSVLink>
        </>
      )}
    </div>
  );
};

export default App;