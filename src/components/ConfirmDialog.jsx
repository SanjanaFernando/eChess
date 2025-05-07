import React from 'react'

const ConfirmDialog = ({ show, onConfirm, onCancel, action, tournamentId }) => {
    if (!show) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
              <h3 className='text-lg front-semibold mb-4>Confirm {action}</h3'></h3>
      </div>
    </div>
  )
}

export default ConfirmDialog
