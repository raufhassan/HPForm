import {
  GET_USER,
  GET_ID,
  GET_DEPENDENTS,
  GET_REMARKS,
  REMOVE_DATA,
  LOGOUT_USER,
  FETCH_USER,
  FETCH_DEPENDENTS,
  FETCH_REMARKS,
  UPDATE_USER,
  INSERT,
} from './types';
import {openDatabase} from 'react-native-sqlite-storage';
import {cos} from 'react-native-reanimated';
var db = openDatabase({name: 'UserDatabase.db'});
export const personalInfo = (userData) => {
  if (userData) {
    return {
      type: GET_USER,
      payload: userData,
    };
  } else {
    console.log('no data');
  }
};
export const DependentInfo = (data) => {
  if (data) {
    return {
      type: GET_DEPENDENTS,
      payload: data,
    };
  } else {
    console.log('no data');
  }
};
export const Remarks = (data) => {
  if (data) {
    return {
      type: GET_REMARKS,
      payload: data,
    };
  } else {
    console.log('no data');
  }
};

export const saveID = (id) => {
  /*  return {
    type: REMOVE_DATA,
    payload: null,
  }; */
  return {
    type: GET_ID,
    payload: id,
  };
};
export const addNew = () => (dispatch) => {
  dispatch({
    type: REMOVE_DATA,
    payload: null,
  });
};

export const insertUser = (user, dependent, userID, remarks, depArray) => (
  dispatch,
) => {
  console.log('called');
  var selectedFor = JSON.stringify(remarks.selectedFor);
  var images = JSON.stringify(remarks.imagesUri);
  var houseOwn = JSON.stringify(user.houseOwn);
  var zakat = JSON.stringify(user.zakat);
  var cnic = JSON.stringify(user.cnic);

  db.transaction((tx) => {
    // Loop would be here in case of many values
    tx.executeSql(
      'INSERT INTO user (user_id,cnic_image, first_name, last_name, gender, guardian, religion, zakat, DOB, marital_status, contact, husband_status, husband_profession, husband_income, husband_company, husband_unemp_type, husband_unemp_reason, address, house_ownership, monthly_rent, town, area, profession, emp_status, monthly_income, skills, rent_exp, education_exp, utility_exp, overall_income, family_is, family_registered,disease, remarks, images,profile_image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        userID,
        cnic,
        user.first_name,
        user.last_name,
        user.gender,
        user.guardian,
        user.Religion,
        zakat,
        user.date,
        user.RelStatus,
        user.cell,
        user.HbState,
        user.Hbprofession,
        user.Hbincome,
        user.Hbcompany,
        user.HbUnemp,
        user.HbReason,
        user.Address,
        houseOwn,
        user.monthlyRent,
        user.Town,
        user.Area,
        user.profession,
        user.empStatus,
        user.MonthlyIncome,
        user.skills,
        dependent.Rent,
        dependent.EducationExp,
        dependent.Utility,
        dependent.OverallIncome,
        remarks.familyIs,
        selectedFor,
        remarks.disease,
        remarks.Remarks,
        images,
        remarks.profileImage,
      ],
      (tx, results) => {
        console.log('Insert Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('user insertion successfull');
          // console.log("last insert id", results.insertId);
          var personId = results.insertId;
          // dependents insertion
          // console.log("details", personId);
          // console.log("depArr", depArray);
          dispatch({
            type: REMOVE_DATA,
            payload: null,
          });
          for (let i = 0; i < depArray.length; i++) {
            tx.executeSql(
              'INSERT INTO dependents (person_id,dep_name,dep_relation,dep_DOB,dep_education,dep_income,councelling,education) VALUES (?,?,?,?,?,?,?,?)',
              [
                personId,
                depArray[i].name,
                depArray[i].Relation,
                depArray[i].DOB,
                depArray[i].Education,
                depArray[i].income,
                JSON.stringify(depArray[i].councelling),
                JSON.stringify(depArray[i].EducationSupport),
              ],
              (tx, results) => {
                console.log('Insert Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  console.log('dep insertion successfull');
                } else {
                  console.log(' Failed');
                }
              },
              (tx, err) => {
                console.log('error', err);
                console.log(i);
              },
            );
          }

          // dependents insertion
        } else {
          console.log(' Failed');
        }
      },
      (tx, err) => {
        console.log('error', err);
      },
    );
  });
  /*   return {
    type: GET_ID,
    payload: null,
  }; */
};
export const insertDependents = (dependents, personID) => (dispatch) => {
  console.log('function called');
  console.log(dependents);
  console.log('person id', personID);
  db.transaction((tx) => {
    // Loop would be here in case of many values
    for (let i = 0; i < dependents.length; i++) {
      tx.executeSql(
        'INSERT INTO dependents (person_id,dep_name,dep_relation,dep_DOB,dep_education,dep_income,councelling,education) VALUES (?,?,?,?,?,?,?,?)',
        [
          personID,
          dependents[i].name,
          dependents[i].Relation,
          dependents[i].DOB,
          dependents[i].Education,
          dependents[i].income,
          JSON.stringify(dependents[i].councelling),
          JSON.stringify(dependents[i].EducationSupport),
        ],
        // "SELECT * FROM dependents",
        // [],
        (tx, results) => {
          console.log('Insert Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('insertion successfull');
            // insert = true;
            dispatch({
              type: REMOVE_DATA,
              payload: null,
            });
          } else {
            console.log(' Failed');
          }
        },
        (tx, err) => {
          console.log('error', err);
          console.log(i);
        },
      );
    }
  });
  /*  return {
    type: GET_ID,
    payload: null,
  }; */
};

export const Logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
export const fetchDependents = (user, remarks, dependent) => (dispatch) => {
  dispatch({
    type: FETCH_USER,
    payload: user,
  });
  dispatch({
    type: FETCH_REMARKS,
    payload: remarks,
  });
  console.log(user.person_id);
  db.transaction((txn) => {
    txn.executeSql(
      // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
      "SELECT * FROM 'dependents' WHERE person_id = ?",
      [user.person_id],
      (tx, res) => {
        console.log('itney dependets:', res.rows.length);
        var len = res.rows.length;
        var data = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < len; i++) {
            //   console.log(res.rows.item(i));
            let row = res.rows.item(i);
            // data.push(row);
            let dep = {
              dep_id: row.dep_id,
              name: row.dep_name,
              DOB: row.dep_DOB,
              income: row.dep_income.toString(),
              Relation: row.dep_relation,
              Education: row.dep_education,
              councelling: JSON.parse(row.councelling),
              EducationSupport: JSON.parse(row.education),
            };
            data.push(dep);
          }
          let dep = {
            dependents: data,
            EducationExp: dependent.EducationExp.toString(),
            OverallIncome: dependent.OverallIncome.toString(),
            Rent: dependent.Rent.toString(),
            Utility: dependent.Utility.toString(),
          };
          dispatch({
            type: FETCH_DEPENDENTS,
            payload: dep,
          });
          // console.log("state dep", dep);
        } else {
          let dep = {
            dependents: [],
            EducationExp: dependent.EducationExp.toString(),
            OverallIncome: dependent.OverallIncome.toString(),
            Rent: dependent.Rent.toString(),
            Utility: dependent.Utility.toString(),
          };
          dispatch({
            type: FETCH_DEPENDENTS,
            payload: dep,
          });
        }
      },
    );
  });
};
export const updateUser = (user, dependent, userID, remarks) => (dispatch) => {
  console.log('update called');
  var selectedFor = JSON.stringify(remarks.selectedFor);
  var images = JSON.stringify(remarks.imagesUri);
  var houseOwn = JSON.stringify(user.houseOwn);
  var zakat = JSON.stringify(user.zakat);
  var cnic = JSON.stringify(user.cnic);

  db.transaction((tx) => {
    // Loop would be here in case of many values
    tx.executeSql(
      'UPDATE user set user_id=?,cnic_image=?, first_name=?, last_name=?, gender=?, guardian=?, religion=?, zakat=?, DOB=?, marital_status=?, husband_status=?, husband_profession=?, husband_income=?, husband_company=?, husband_unemp_type=?, husband_unemp_reason=?, address=?, house_ownership=?, monthly_rent=?, town=?, area=?, profession=?, emp_status=?, monthly_income=?, skills=?, rent_exp=?, education_exp=?, utility_exp=?, overall_income=?, family_is=?, family_registered=?,disease=?, remarks=?, images=?, profile_image=?  WHERE person_id=?',
      [
        userID,
        cnic,
        user.first_name,
        user.last_name,
        user.gender,
        user.guardian,
        user.Religion,
        zakat,
        user.date,
        user.RelStatus,
        user.HbState,
        user.Hbprofession,
        user.Hbincome,
        user.Hbcompany,
        user.HbUnemp,
        user.HbReason,
        user.Address,
        houseOwn,
        user.monthlyRent,
        user.Town,
        user.Area,
        user.profession,
        user.empStatus,
        user.MonthlyIncome,
        user.skills,
        dependent.Rent,
        dependent.EducationExp,
        dependent.Utility,
        dependent.OverallIncome,
        remarks.familyIs,
        selectedFor,
        remarks.disease,
        remarks.Remarks,
        images,
        remarks.profileImage,
        user.person_id,
      ],
      (tx, results) => {
        console.log('update Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          dispatch({
            type: UPDATE_USER,
            payload: null,
          });
          console.log('updated successfull');
        } else {
          console.log(' Failed');
        }
      },
      (tx, err) => {
        console.log('error', err);
      },
    );
  });
};
export const deleteDependents = (person_id) => (dispatch) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM  dependents where person_id=?',
      [person_id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('deleted');
          dispatch({
            type: UPDATE_USER,
          });
        } else {
          console.log('unsuccessfull');
        }
      },
    );
  });
};
export const updateDependents = (dependents, personID) => (dispatch) => {
  console.log('function called');
  console.log(dependents);
  console.log('person id', personID);
  db.transaction((tx) => {
    // Loop would be here in case of many values
    for (let i = 0; i < dependents.length; i++) {
      tx.executeSql(
        'UPDATE dependents set dep_name=?,dep_relation=?,dep_DOB=?,dep_education=?,dep_income=?,councelling=?,education=? WHERE person_id=? AND dep_id=?',
        [
          dependents[i].name,
          dependents[i].Relation,
          dependents[i].DOB,
          dependents[i].Education,
          dependents[i].income,
          JSON.stringify(dependents[i].councelling),
          JSON.stringify(dependents[i].EducationSupport),
          personID,
          dependents[i].dep_id,
        ],
        // "SELECT * FROM dependents",
        // [],
        (tx, results) => {
          console.log('update Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('updated successfull');
            // insert = true;
            dispatch({
              type: REMOVE_DATA,
              payload: null,
            });
          } else {
            console.log(' Failed');
          }
        },
        (tx, err) => {
          console.log('error', err);
          console.log(i);
        },
      );
    }
  });
};
export const insertCheck = () => (dispatch) => {
  db.transaction((txn) => {
    // Loop would be here in case of many values

    txn.executeSql(
      'INSERT INTO table_user (user_name, user_contact, user_email) VALUES (?,?,?)',
      ['hassdas', 234324, 'sdds@gmail.com'],
      (tx, results) => {
        console.log('Insert Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('inserted');
          console.log(results.insertId);
          txn.executeSql('SELECT * FROM dependents', [], (tx, results) => {
            console.log('rows length', results.rows.length);
            dispatch({
              type: LOGOUT_USER,
            });
          });
        } else {
          console.log('Updation Failed');
        }
      },
    );
  });
};
