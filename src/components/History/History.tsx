import React from 'react';

import {
  getItem,
} from '../../services/storage';
import { STORED_GROUPED_CROSS_CHAIN_ACTIONS } from '../../constants/storageConstants';
import ActionPreview from '../TransactionPreview/ActionPreview';
import { DispatchedCrossChainAction } from '../../providers/TransactionsDispatcherContextProvider';

const History = () => {
  let storedGroupedCrossChainActions: { [id: string]: DispatchedCrossChainAction[] } = {};

  try {
    const storedGroupedCrossChainActionsRaw = getItem(STORED_GROUPED_CROSS_CHAIN_ACTIONS);
    storedGroupedCrossChainActions = storedGroupedCrossChainActionsRaw
      ? JSON.parse(storedGroupedCrossChainActionsRaw)
      : {};
  } catch (e) {
    //
  }

  const storedGroupedCrossChainActionsIds = Object.keys(storedGroupedCrossChainActions);

  return (
    <div>
      {!storedGroupedCrossChainActionsIds?.length && (
        <p>No history.</p>
      )}
      {storedGroupedCrossChainActionsIds.map((id) => (
        storedGroupedCrossChainActions[id].map((crossChainAction) => (
          <ActionPreview
            key={`action-preview-${id}-${crossChainAction.id}`}
            data={crossChainAction.preview}
            transactions={crossChainAction.transactions}
            type={crossChainAction.type}
          />
        ))
      ))}
    </div>
  )
};

export default History;
