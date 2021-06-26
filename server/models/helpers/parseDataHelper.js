const parseData = (queryResults) => {
  console.log(queryResults);
  const result = queryResults[0];
  const key = Object.keys(result)[0];
  const data = queryResults.length > 1 ? queryResults.map(product => JSON.parse(product[key])) : JSON.parse(result[key]);

  return data;
}

module.exports = parseData;