let dom_table = $("#show_table_data");
dom_table.children().html("");
async function getData() {
  let req = await fetch("jsonDb.json");
  return await req.json();
}

getData().then((data) => {
  const totalData = data.tableData.length;
  let nextCount = 0;
  let nextNum = parseInt(data.config.ShowNoOfRows) - 1;

  for (; nextCount <= nextNum; nextCount++) {
    if (data.tableData[nextCount] != undefined) {
      dom_table.append(`
          <tr>
            <td scope="row">${data.tableData[nextCount].dateTime} / ${data.tableData[nextCount].id}</td>
            <td class="td_bti">${data.tableData[nextCount].btc}</td>
            <td><a href=""> ${data.tableData[nextCount].address} </a></td>
            <td>
              <a href="">${data.tableData[nextCount].txid}</a>
            </td>
          </tr>
      `);
    }
  }

  setInterval(function () {
    if (nextCount <= nextNum) {
      dom_table.children().html("");
    }
    for (; nextCount <= nextNum; nextCount++) {
      if (data.tableData[nextCount] != undefined) {
        dom_table.append(`
            <tr>
              <td scope="row">${data.tableData[nextCount].dateTime} / ${data.tableData[nextCount].id}</td>
              <td class="td_bti">${data.tableData[nextCount].btc}</td>
              <td><a href=""> ${data.tableData[nextCount].address} </a></td>
              <td>
                <a href="">${data.tableData[nextCount].txid}</a>
              </td>
            </tr>
        `);
      }
    }

    if (totalData <= nextCount) {
      nextCount = 0;
      if (parseInt(data.config.ShowNoOfRows) % 2 == 0) {
        console.log("The number is even.");
        nextNum =
          parseInt(data.config.ShowNoOfRows) -
          parseInt(data.config.ShowNoOfRows) +
          1;
      } else {
        console.log("The number is odd.");
        nextNum =
          parseInt(data.config.ShowNoOfRows) -
          parseInt(data.config.ShowNoOfRows) -
          1;
      }
    }

    nextNum += parseInt(data.config.ShowNoOfRows);
  }, data.config.refeshTime);
});
