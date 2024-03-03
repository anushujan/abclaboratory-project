import React from 'react'
import DoctorTable from '../../../components/DoctorTable'

const Doctor = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h3 className="text-[20px]">Doctor Informations</h3>
        <a href="/create-doctor">
          <button
            type="button"
            class="text-white bg-[#3067af] hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Create New Doctor
          </button>
        </a>
      <div>
        <DoctorTable/>
      </div>
    </div>
  )
}

export default Doctor