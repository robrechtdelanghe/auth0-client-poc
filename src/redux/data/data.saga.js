import { select, put, takeEvery } from 'redux-saga/effects';

import {
  ADD_LINE_START,
  addLineError,
  addLineSuccess, DELETE_LINE_START, deleteLineError, deleteLineSuccess,
} from './data.actions'
import auth0 from "auth0-js"
import {AUTH_CONFIG} from "../auth/auth.variables"

function* addLine2({payload}) {
  try {
    const { auth } = yield select()

    // console.log(json)
  } catch (error) {
    yield put(addLineError(error));
    console.log('Error adding line', error)
  }
}
function* addLine({payload}) {
  try {
    const { auth, settings } = yield select()

    const lines = JSON.parse(JSON.stringify(auth.user.user_metadata.lines)) || {}
    lines[payload.linenumber] = {
      id: payload.linenumber,
      subscribed: payload.subscribed || false,
    }

    switch (settings.apiSource) {
      case "delijn": {
        const json = yield fetch('http://localhost:3001/api/line', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
          },
          body: JSON.stringify({is:payload})
        })
          .then(response => response.json())
        break;
      }
      case "auth0":
      default: {
        const management = new auth0.Management({
          domain: AUTH_CONFIG.domain,
          token: auth.accessToken,
        });

        const result = yield promisePatchUserMedadata(management, auth.user.sub, { lines })
        yield put(addLineSuccess(result.user_metadata));
      }
    }




  } catch (error) {
    yield put(addLineError(error));
    console.log('Error adding line', error)
  }
}

function* deleteLine({payload}) {
  try {
    const { auth } = yield select()

    const management = new auth0.Management({
      domain: AUTH_CONFIG.domain,
      token: auth.accessToken,
    });

    const lines = auth.user.user_metadata.lines || {}
    delete lines[payload]

    const result = yield promisePatchUserMedadata(management, auth.user.sub, { lines })

    yield put(deleteLineSuccess(result.user_metadata));
  } catch (error) {
    yield put(deleteLineError(error));
    console.log('Error adding line', error)
  }
}

function promisePatchUserMedadata(management, userid, metadata) {
  return new Promise((resolve, reject) => {
    management.patchUserMetadata(userid, metadata, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export function* watchAddLine() {
  yield takeEvery(ADD_LINE_START, addLine);
}

export function* watchDeleteLine() {
  yield takeEvery(DELETE_LINE_START, deleteLine);
}
