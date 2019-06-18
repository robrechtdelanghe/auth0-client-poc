import { put, select, takeEvery, all } from 'redux-saga/effects'

import {
  ADD_LINE_START,
  addLineError,
  addLineSuccess,
  DELETE_LINE_START,
  deleteLineError,
  deleteLineSuccess,
} from './data.actions'
import {API_SOURCE_AUTH0, API_SOURCE_DELIJN} from "../../constants"
import {updateLines as updateLinesDelijn} from "./data.api.delijn"
import {updateLines as updateLinesAuth0} from "./data.api.auth0"

function* addLine({payload}) {
  try {
    const { auth, settings } = yield select()

    const lines = JSON.parse(JSON.stringify(auth.user.user_metadata.lines)) || []

    const line = lines.find(line => line.id === payload.linenumber)
    if (line) {
      line.subscribed = payload.subscribed
    } else {
      lines.push({
        id: payload.linenumber,
        subscribed: payload.subscribed || false,
      })
    }

    const user = yield updateLines(settings.apiSource, auth, lines)
    yield put(addLineSuccess(user.user_metadata.lines))

  } catch (error) {
    yield put(addLineError(error));
    console.log('Error adding line', error)
  }
}

function* deleteLine({payload}) {
  try {
    const { auth, settings } = yield select()

    const lines = JSON.parse(JSON.stringify(auth.user.user_metadata.lines)) || {}
    const newLines = lines.filter(line => line.id !== payload)
    const user = yield updateLines(settings.apiSource, auth, newLines)

    yield put(deleteLineSuccess(user.user_metadata.lines))
  } catch (error) {
    yield put(deleteLineError(error));
    console.log('Error adding line', error)
  }
}

function* updateLines(apiSource, auth, lines) {
  switch (apiSource) {
    case API_SOURCE_DELIJN: {
      return yield updateLinesDelijn(auth, lines)
    }
    case API_SOURCE_AUTH0:
    default: {
      return yield updateLinesAuth0(auth, lines)
    }
  }
}

export function* watchAddLine() {
  yield takeEvery(ADD_LINE_START, addLine);
}

export function* watchDeleteLine() {
  yield takeEvery(DELETE_LINE_START, deleteLine);
}

export default function* dataSagas() {
  yield all([
    watchAddLine(),
    watchDeleteLine(),
  ])
}
