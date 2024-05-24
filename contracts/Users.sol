pragma solidity ^ 0.8.0;

contract Users {
    
    	uint public patientCount;
		uint public doctorCount;
		uint public pharmacyCount;
		uint public healthCarecount;
		Patient [] public patientrecords;
		struct Patient {
				address patientAddress;
				string name;
				uint age;
				uint contact;
				string userAddress;
				uint prescriptionCount;
				uint receiptCount;
				uint recordCount;
				Prescription[] prescriptions;
				Record[] records;
				Receipt[] receipts;

		}
		struct Doctor {
			address doctorAddress;
			address healthCareAddress;
			uint id;
			string name;
			string designation;
			Patient [] patients;
		}
		

		struct HealthCare {
				address chainAddress;
				string name;
				uint contact;
				address healthCareAddress;
				uint patientsCount;
		}

		struct Record {
				uint recordid;
				string disease;
				address doctorAddress;
				address chainAddress;
				uint256 timestamp;
		}

		struct Receipt {
				uint receiptid;
				address chainAddress;
				uint256 timestamp;
				uint totalcost;
				string drugname;
				uint drugCount;
				uint256 receiptNumber;
		}

		struct Prescription {
				uint prescriptionid;
				address doctorAddress;
				address chainAddress;
				uint256 timestamp;
				string drugname;
				uint drugCost;
				uint drugCount;
		}


		event AddPatient(
				uint id,
				address patientAddress,
				string name,
				uint age,
				uint contact,
				string userAddress
		);
		event AdddDoctor(
				address doctorAddress,
				address healthCareAddress,
				uint id,
				string name,
				string designation
		);
		event PatientExists(
				string description
		);

		event AddPrescription(
				uint prescriptionid,
				address doctorAddress,
				address chainAddress,
				string drugname,
				uint drugCost,
				uint drugCount,
				uint256 timestamp
		);

		event AddRecord(
				uint recordid,
				string disease,
				address doctorAddress,
				address chainAddress,
				uint256 timestamp
		);

		event AddReceipt(
				uint receiptid,
				address chainAddress,
				string drugname,
				uint256 timestamp,
				uint totalcost,
				uint256 receiptNumber,
				uint drugCount
		);

		mapping (uint => Patient) public patients;
		mapping (uint => Doctor) public doctors;
		mapping(string => uint) public drugCosts;
		mapping (uint => HealthCare) public healthCares;
		uint[] public patientsList;
		uint[] public doctorsList;
		uint[] public drugsList;
		uint[] public healthCarelist;

	

function loginDoctor(address _doctorAddress) public view returns (bool) {
    uint doctorIndex = 0;
    for (uint i = 1; i <= doctorCount; i++) {
        if (doctors[i].doctorAddress == _doctorAddress) {
            doctorIndex = i;
            return true;
        }
    }
    return false;
}
function loginHealthCare(address _healthCareAddress) public view returns (bool) {
    uint healthCareIndex = 0;
    for (uint i = 1; i <= healthCarecount; i++) {
        if (healthCares[i].healthCareAddress == _healthCareAddress) {
            healthCareIndex = i;
            return true;
        }
    }
    return false;
}
function loginPatient(address _patientAddress) public view returns (bool) {
    uint patientIndex = 0;
    for (uint i = 1; i <= patientCount; i++) {
        if (patients[i].patientAddress == _patientAddress) {
            patientIndex= i;
            return true;
        }
    }
    return false;
}
			function setDoctor(address _doctorAddress, string memory _name, string memory _designation) public {
				uint id = doctorCount + 1;
				Doctor storage doctor = doctors[id];

				doctor.doctorAddress = _doctorAddress;
				doctor.healthCareAddress = msg.sender;
				doctor.name = _name;
				doctor.designation = _designation;

				doctorsList.push(id);
				doctorCount++;
				emit AdddDoctor(_doctorAddress, msg.sender, id, _name,_designation );
		}


		function setPatient(address _patientAddress, string memory _name, uint _age, uint _contact, string memory _userAddress) public {
				uint id = patientCount + 1;
				uint doctorIndex = getDoctorIndex(msg.sender);
				Patient storage patient = patients[id];
				patient.patientAddress = _patientAddress;
				patient.name = _name;
				patient.age = _age;
				patient.contact = _contact;
				patient.userAddress = _userAddress;
				patient.prescriptionCount = 0;
				patient.receiptCount = 0;
				patient.recordCount = 0;

				patientsList.push(id);
				doctors[doctorIndex].patients.push(patient);

				patientCount++;
				
				emit AddPatient(id, _patientAddress, _name, _age, _contact, _userAddress);
		}

		function setDrugCost(string memory drugName, uint cost) public {
        drugCosts[drugName] = cost;
    }
		
function setDiagnosisfromAddress(address _patientAddress, string memory _disease, address _chainAddress, address _doctorAddress) public {
    uint patientIndex = getPatientIndex(_patientAddress);
    uint doctorIndex = getDoctorIndex(_doctorAddress);
    uint patientIndoctor = getPatientIndexfromDoctor(_patientAddress, _doctorAddress);
    require(patientIndex != 0, "Patient not found");
    require(doctorIndex != 0, "Doctor not found");

    Patient storage patient = patients[patientIndex];
    Record memory temp;
    uint id = patient.recordCount + 1;
    temp.recordid = id;
    temp.disease = _disease;
	temp.doctorAddress = _doctorAddress;
    temp.chainAddress = _chainAddress;
    temp.timestamp = block.timestamp;
    patient.records.push(temp);
    doctors[doctorIndex].patients[patientIndoctor].records.push(temp);
    patient.recordCount++;

    emit AddRecord(id, _disease, _doctorAddress, _chainAddress, block.timestamp);
}
function setPrescriptionfromAddress(address _patientAddress, address _chainAddress, string memory _drugname, uint _drugCount, address _doctorAddress) public {
    uint patientIndex = getPatientIndex(_patientAddress);
    uint doctorIndex = getDoctorIndex(_doctorAddress);
    uint patientIndoctor = getPatientIndexfromDoctor(_patientAddress, _doctorAddress);
    require(patientIndex != 0, "Patient not found");
    require(doctorIndex != 0, "Doctor not found");

    uint drugCost = drugCosts[_drugname];

    Patient storage patient = patients[patientIndex];
    Prescription memory temp;
    uint id = patient.prescriptions.length + 1;
    temp.prescriptionid = id;
    temp.doctorAddress = _doctorAddress;
    temp.chainAddress = _chainAddress;
    temp.timestamp = block.timestamp;
    temp.drugname = _drugname;
	temp.drugCost = drugCost;
    temp.drugCount = _drugCount;

    patient.prescriptions.push(temp); // add the new prescription object to the patient's prescriptions array
    doctors[doctorIndex].patients[patientIndoctor].prescriptions.push(temp);

    emit AddPrescription(id, _doctorAddress, _chainAddress, _drugname, drugCost, _drugCount, block.timestamp);
}

		function getPatientCount() public view returns (uint) {
				return patientCount;
		}

		function getPatientfromID(uint _id) public view returns (address, string memory, uint, uint, string memory) {
				Patient storage patient = patients[_id];
				return (patient.patientAddress, patient.name, patient.age, patient.contact, patient.userAddress);
		}
		function getDoctorfromID(uint _id, uint _pid) public view returns (address, address, string memory, string memory, string memory) {
				Doctor storage doctor = doctors[_id];
				return (doctor.doctorAddress, doctor.healthCareAddress, doctor.name, doctor.designation, doctor.patients[_pid].name);
		}


		
		




function getReceiptfromAddress(address _patientAddress, uint _index) view public returns (uint,address,uint256,uint,string memory,uint,uint256) {
		uint patientIndex = 0;
		for (uint i = 1; i <= patientCount; i++) {
				if (patients[i].patientAddress == _patientAddress) {
						patientIndex = i;
						break;
				}
		}
	
		return (
				patients[patientIndex].receipts[_index].receiptid,
		patients[patientIndex].receipts[_index].chainAddress,
		patients[patientIndex].receipts[_index].timestamp,
		patients[patientIndex].receipts[_index].totalcost,
		patients[patientIndex].receipts[_index].drugname,
		patients[patientIndex].receipts[_index].drugCount,
		patients[patientIndex].receipts[_index].receiptNumber
        
		);
}

    function getReceipt(address _patientAddress) public view returns (Prescription [] memory) {
		uint patientIndex = getPatientIndex(_patientAddress);
		return patients[patientIndex].prescriptions;
		}


function setReceiptfromAddress(address _patientAddress,address _chainAddress,string memory _drugname,uint _totalcost,uint _drugCount, uint256 _receiptNumber) public {
		uint patientIndex = 0;
								for (uint i = 1; i <= patientCount; i++) {
										if (patients[i].patientAddress == _patientAddress) {
										patientIndex = i;
								break;
								 }
						}
		Patient storage patient = patients[patientIndex];
		Receipt memory temp;
		uint id = patient.receiptCount + 1;
		temp.receiptid = id;
		temp.chainAddress = _chainAddress;
		temp.timestamp = block.timestamp;
		temp.totalcost = _totalcost;
		temp.drugname = _drugname;
		temp.drugCount = _drugCount;
		temp.receiptNumber =_receiptNumber;
		patient.receipts.push(temp);
		patient.receiptCount++;

		emit AddReceipt(id,_chainAddress,_drugname,block.timestamp,_totalcost,_receiptNumber,_drugCount);
}





function getDoctorIndex(address _doctorAddress) public view returns (uint) {
    for (uint i = 1; i <= doctorCount; i++) {
        if (doctors[i].doctorAddress == _doctorAddress) {
            return i;
        }
    }
    return 0;
}

function getPatientIndex(address _patientAddress) public view returns (uint) {
    for (uint i = 1; i <= patientCount; i++) {
        if (patients[i].patientAddress == _patientAddress) {
            return i;
        }
    }
    return 0;
}

function getPatientIndexfromDoctor(address _patientAddress, address _doctorAddress) public view returns (uint) {
    uint doctorIndex = getDoctorIndex(_doctorAddress);
    require(doctorIndex != 0, "Doctor not found");

    for (uint i = 0; i < doctors[doctorIndex].patients.length; i++) {
        if (doctors[doctorIndex].patients[i].patientAddress == _patientAddress) {
            return i;
        }
    }
    return 0;
}
	function getPatientsByDoctor(address _doctorAddress) public view returns (Patient[] memory) {
    uint doctorIndex = getDoctorIndex(_doctorAddress);
    require(doctorIndex != 0, "Doctor not found");

    return doctors[doctorIndex].patients;
}

	function getPatientsByDoctorIndex(uint doctorIndex) public view returns (Patient[] memory) {
    require(doctorCount != 0, "Doctor not found");
    return doctors[doctorIndex].patients;
	}
	function docount () public view returns (uint){
		return doctorCount;
	}
	


	
}
