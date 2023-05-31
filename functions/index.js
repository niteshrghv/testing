// const functions = require("firebase-functions");
// const cors = require("cors");
// const XLSX = require("xlsx");
// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// exports.convertExcelToExcel = functions.https.onRequest((req, res) => {
//   const rawsheetdata = req.body;
//   const sheetdatabuffer = new Uint8Array(rawsheetdata);
//   const workbook = XLSX.read(sheetdatabuffer, { type: "array" });
//   const sheetName = workbook.SheetNames;

//   const jsonrowsheetdata = [];

//   for (let i = 0; i < sheetName.length; i++) {
//     const worksheet = workbook.Sheets[sheetName[i]];
//     const rowsheetdata = XLSX.utils.sheet_to_json(worksheet, {
//       header: 0,
//     });

//     for (let j = 0; j < rowsheetdata.length; j++) {
//       jsonrowsheetdata.push(rowsheetdata[j]);
//     }
//   }

//   //Validation Functions
//   const validationlrNo = (rownamevariable) => {
//     return typeof rownamevariable.lrNo === "string" ? true : false;
//   };

//   const validationlrNoForSearch = (rownamevariable) => {
//     return typeof rownamevariable.lrNoForSearch === "string" ? true : false;
//   };

//   const validationcustomerName = (rownamevariable) => {
//     return typeof rownamevariable.customerName === "string" ? true : false;
//   };

//   const validationstatus = (rownamevariable) => {
//     return typeof rownamevariable.status === "string" ? true : false;
//   };

//   const validationcustomerAddress = (rownamevariable) => {
//     return typeof rownamevariable.customerAddress === "string" || "undefined"
//       ? true
//       : false;
//   };

//   const validationlrDate = (rownamevariable) => {
//     return typeof rownamevariable.lrDate === "string" ? true : false;
//   };

//   const validationdestination = (rownamevariable) => {
//     return typeof rownamevariable.destination === "string" ? true : false;
//   };

//   const validationactualDeliveryDate = (rownamevariable) => {
//     return typeof rownamevariable.actualDeliveryDate === "string"
//       ? true
//       : false;
//   };

//   const validationdelayReason = (rownamevariable) => {
//     return typeof rownamevariable.delayReason === "string" || "undefined"
//       ? true
//       : false;
//   };
//   const validationfrontImageURL = (rownamevariable) => {
//     return typeof rownamevariable.frontImageURL === "string" || "undefined"
//       ? true
//       : false;
//   };

//   const validationbackImageURL = (rownamevariable) => {
//     return typeof rownamevariable.backImageURL === "string" || "undefined"
//       ? true
//       : false;
//   };

//   //array of function
//   const funcarr = [
//     validationlrNo,
//     validationlrNoForSearch,
//     validationcustomerName,
//     validationstatus,
//     validationcustomerAddress,
//     validationlrDate,
//     validationdestination,
//     validationactualDeliveryDate,
//     validationdelayReason,
//   ];

//   //array of columns
//   const nameofcols = [
//     "lrNo",
//     "lrNoForSearch",
//     "customerName",
//     "status",
//     "customerAddress",
//     "lrDate",
//     "destination",
//     "actualDeliveryDate",
//     "delayReason",
//   ];

//   //function for get all keys from values
//   const getKeysWithValue = (myMap, targetValue) => {
//     let keysWithValue = [];
//     for (let [key, value] of myMap.entries()) {
//       if (value === targetValue) {
//         keysWithValue.push(key);
//       }
//     }
//     return keysWithValue;
//   };

//   const returndata = [];

//   for (let i = 0; i < jsonrowsheetdata.length; i++) {
//     const mymap = new Map();
//     let value_rsd = jsonrowsheetdata[i];
//     for (let j = 0; j < funcarr.length; j++) {
//       mymap.set(nameofcols[j], funcarr[j](value_rsd));
//     }

//     //get all false values keys
//     const getallfalseval = getKeysWithValue(mymap, false);

//     let errordata = [];

//     if (getallfalseval.length != 0) {
//       errordata.push(getallfalseval);
//     }
//     if (getallfalseval.length != 0) {
//       for (let k = 1; k <= errordata[0].length; k++) {
//         value_rsd["error" + k] = `${errordata[0][k - 1]}`;
//       }
//       returndata.push(value_rsd);
//     }
//   }

//   //Change return data into Excel

//   const workbook1 = XLSX.utils.book_new();
//   const worksheet1 = XLSX.utils.json_to_sheet(returndata, { cellStyles: true });
//   XLSX.utils.book_append_sheet(workbook1, worksheet1, "Sheet1");
//   const returnexcel = XLSX.write(workbook1, {
//     type: "buffer",
//     bookType: "xlsx",
//   });
//   res.send(returnexcel);
// });

const functions = require("firebase-functions");
const cors = require("cors");
const XLSX = require("xlsx");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

exports.convertExcelToExcel = functions.https.onRequest((req, res) => {
  const rawsheetdata = req.body;
  const sheetdatabuffer = new Uint8Array(rawsheetdata);
  const workbook = XLSX.read(sheetdatabuffer, { type: "array" });
  const sheetNames = workbook.SheetNames;

  const jsonRowsSheetData = [];

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const rowsSheetData = XLSX.utils.sheet_to_json(worksheet, {
      header: 0,
    });

    jsonRowsSheetData.push(...rowsSheetData);
  });

  // Validation Functions
  const validateString = (value) => {
    return typeof value === "string";
  };

  const validateStringOrUndefined = (value) => {
    return typeof value === "string" || typeof value === "undefined";
  };

  const validationFunctions = [
    { columnName: "lrNo", validationFn: validateString },
    { columnName: "lrNoForSearch", validationFn: validateString },
    { columnName: "customerName", validationFn: validateString },
    { columnName: "status", validationFn: validateString },
    { columnName: "customerAddress", validationFn: validateStringOrUndefined },
    { columnName: "lrDate", validationFn: validateString },
    { columnName: "destination", validationFn: validateString },
    { columnName: "actualDeliveryDate", validationFn: validateString },
    { columnName: "delayReason", validationFn: validateStringOrUndefined },
  ];

  const getInvalidColumns = (rowData) => {
    return validationFunctions
      .filter((fn) => !fn.validationFn(rowData[fn.columnName]))
      .map((fn) => fn.columnName);
  };

  const returndatatoexcel = [],
    noerrordata = [];
  const returnData = jsonRowsSheetData.map((rowData) => {
    const invalidColumns = getInvalidColumns(rowData);
    const errorData = {};

    if (invalidColumns.length > 0) {
      invalidColumns.forEach((column, index) => {
        errorData[`error${index + 1}`] = column;
      });
      returndatatoexcel.push({ ...rowData, ...errorData });
    } else {
      noerrordata.push(rowData);
    }
  });

  // Convert return data into Excel
  const workbook1 = XLSX.utils.book_new();
  const worksheet1 = XLSX.utils.json_to_sheet(returndatatoexcel, {
    cellStyles: true,
  });
  XLSX.utils.book_append_sheet(workbook1, worksheet1, "Sheet1");
  const returnExcel = XLSX.write(workbook1, {
    type: "buffer",
    bookType: "xlsx",
  });

  res.send(returnExcel);
});
