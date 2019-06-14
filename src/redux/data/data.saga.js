import { select, put, takeEvery } from 'redux-saga/effects';

import {
  ADD_LINE_START,
  addLineError,
  addLineSuccess, DELETE_LINE_START, deleteLineError, deleteLineSuccess,
} from './data.actions'
import auth0 from "auth0-js"
import {AUTH_CONFIG} from "../auth/auth.variables"
import {API_DELIJN, API_SOURCE_AUTH0, API_SOURCE_DELIJN} from "../../constants"
import {updateLines as updateLinesDelijn} from "./data.api.delijn"
import {updateLines as updateLinesAuth0} from "./data.api.auth0"

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
      case API_SOURCE_DELIJN: {
        console.log('add line delijn')
        const resultLines = yield updateLinesDelijn(auth, lines)
        console.log(resultLines)
        yield put(addLineSuccess(lines));
        break;
      }
      case API_SOURCE_AUTH0:
        console.log('add line auth0')
      default: {
        const resultLines = updateLinesAuth0(auth, lines)
        console.log(resultLines)
        yield put(addLineSuccess(lines));
      }
    }

  } catch (error) {
    yield put(addLineError(error));
    console.log('Error adding line', error)
  }
}

function* deleteLine({payload}) {
  try {
    const { auth, settings } = yield select()

    const lines = JSON.parse(JSON.stringify(auth.user.user_metadata.lines)) || {}
    delete lines[payload]

    switch (settings.apiSource) {
      case API_SOURCE_DELIJN: {
        console.log('remove line delijn')
        const resultLines = yield updateLinesDelijn(auth, lines)
        console.log(resultLines)
        yield put(deleteLineSuccess(lines));
        break;
      }
      case API_SOURCE_AUTH0:
        console.log('remove line auth0')
      default: {
        const resultLines = updateLinesAuth0(auth, lines)
        console.log(resultLines)
        yield put(deleteLineSuccess(lines));
      }
    }

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
