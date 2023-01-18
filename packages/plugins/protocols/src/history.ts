import { Editable, Operation } from '@editablejs/editor'

const HISTORY_PROTOCOL_WEAK_MAP = new WeakMap<Editable, HistoryProtocol>()

export interface HistoryProtocol {
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  capture: (op: Operation) => boolean
}

export const HistoryProtocol = {
  undo: (historyProtocol: HistoryProtocol) => {
    historyProtocol.undo()
  },
  redo: (historyProtocol: HistoryProtocol) => {
    historyProtocol.redo()
  },
  canUndo: (historyProtocol: HistoryProtocol): boolean => {
    return historyProtocol.canUndo()
  },
  canRedo: (historyProtocol: HistoryProtocol): boolean => {
    return historyProtocol.canRedo()
  },
  capture: (historyProtocol: HistoryProtocol, op: Operation): boolean => {
    return historyProtocol.capture(op)
  },
}

export const createHistoryProtocol = (editor: Editable): HistoryProtocol => {
  const historyProtocol: HistoryProtocol = {
    undo: () => {
      console.warn('undo not implemented')
    },
    redo: () => {
      console.warn('redo not implemented')
    },
    canUndo: () => {
      return false
    },
    canRedo: () => {
      return false
    },
    capture: (op: Operation) => {
      return true
    },
  }
  return historyProtocol
}

export const useHistoryProtocol = (editor: Editable): HistoryProtocol => {
  let historyProtocol = HISTORY_PROTOCOL_WEAK_MAP.get(editor)
  if (!historyProtocol) {
    historyProtocol = createHistoryProtocol(editor)
    HISTORY_PROTOCOL_WEAK_MAP.set(editor, historyProtocol)
  }
  return historyProtocol
}
