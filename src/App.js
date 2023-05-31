// import React, { useEffect, useState } from 'react';
// import { collection, collectionGroup,query, where, getDocs } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// const YourComponent = () => {
//   const [subcollectionData, setSubcollectionData] = useState([]);

//   useEffect(() => {
//     const config = {
//     apiKey: "AIzaSyCan6BcoMdBxRm89dMYl3emz_DSmxht9fk",
//   authDomain: "nitesh-93bb6.firebaseapp.com",
//   projectId: "nitesh-93bb6",
//   storageBucket: "nitesh-93bb6.appspot.com",
//   messagingSenderId: "515340586300",
//   appId: "1:515340586300:web:1a6e14d1553dfe1bc8a239",
//   measurementId: "G-0JJHM2ZJMR"
//     };
//     firebase.initializeApp(config);
//     const db = firebase.firestore();

//      const data=[];

//         const fetchData = async () => {
//           try {
      
//             //   const collection1 = await getDocs(
//             //   query(
//             //     collectionGroup(db, 'new-users')
//             //     // where(field query)
//             //   )
//             // );
//             // const newData3 = collection1.docs.map((doc) => doc.data())
//             // .filter((data) => Object.keys(data).length > 0);
    
//             // setSubcollectionData(newData3);

          


//                 const documentRef = db.collection('new-users/meta/new-users').doc('B2B');
//                 const subcollectionSnapshot = await documentRef.collection('new-users').get();
            
//                 subcollectionSnapshot.forEach((doc) => {
//                   console.log(doc.id, '=>', doc.data());
//                 });
              
            



//         } catch (error) {
//             console.error('Error getting subcollection data:', error);
//           }
//         };
//         fetchData();
//       }, []);
    
//       // console.log(subcollectionData);
    
//       return null;
//     };
    
//     export default YourComponent;
