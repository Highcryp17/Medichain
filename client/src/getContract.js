import web3 from "./web3";

var abi = 
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contact",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			}
		],
		"name": "AddPatient",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prescriptionid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "doctorAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "drugname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "drugCost",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "drugCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AddPrescription",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "receiptid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "drugname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalcost",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "receiptNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "drugCount",
				"type": "uint256"
			}
		],
		"name": "AddReceipt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recordid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "disease",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "doctorAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AddRecord",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "doctorAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "healthCareAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "designation",
				"type": "string"
			}
		],
		"name": "AdddDoctor",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "PatientExists",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "docount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "doctorCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "doctors",
		"outputs": [
			{
				"internalType": "address",
				"name": "doctorAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "healthCareAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "doctorsList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "drugCosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drugsList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "getDoctorIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "getDoctorfromID",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatientCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			}
		],
		"name": "getPatientIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "getPatientIndexfromDoctor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPatientfromID",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "getPatientsByDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "contact",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "prescriptionCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "receiptCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recordCount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "prescriptionid",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "doctorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "drugname",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "drugCost",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "drugCount",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Prescription[]",
						"name": "prescriptions",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "recordid",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "disease",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "doctorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Record[]",
						"name": "records",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "receiptid",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalcost",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "drugname",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "drugCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "receiptNumber",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Receipt[]",
						"name": "receipts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Users.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "doctorIndex",
				"type": "uint256"
			}
		],
		"name": "getPatientsByDoctorIndex",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "contact",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "prescriptionCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "receiptCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recordCount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "prescriptionid",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "doctorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "drugname",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "drugCost",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "drugCount",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Prescription[]",
						"name": "prescriptions",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "recordid",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "disease",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "doctorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Record[]",
						"name": "records",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "receiptid",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "chainAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalcost",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "drugname",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "drugCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "receiptNumber",
								"type": "uint256"
							}
						],
						"internalType": "struct Users.Receipt[]",
						"name": "receipts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Users.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			}
		],
		"name": "getReceipt",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "prescriptionid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "doctorAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "chainAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "drugname",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "drugCost",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "drugCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Users.Prescription[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getReceiptfromAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "healthCarecount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "healthCarelist",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "healthCares",
		"outputs": [
			{
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "contact",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "healthCareAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "patientsCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "loginDoctor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_healthCareAddress",
				"type": "address"
			}
		],
		"name": "loginHealthCare",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			}
		],
		"name": "loginPatient",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "patientCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientrecords",
		"outputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "prescriptionCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "receiptCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recordCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patients",
		"outputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "prescriptionCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "receiptCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recordCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientsList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pharmacyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_disease",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_chainAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "setDiagnosisfromAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_designation",
				"type": "string"
			}
		],
		"name": "setDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "drugName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "setDrugCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_contact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "setPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_chainAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_drugname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_drugCount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "setPrescriptionfromAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_chainAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_drugname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_totalcost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drugCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receiptNumber",
				"type": "uint256"
			}
		],
		"name": "setReceiptfromAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]



var address = "0xE6Fa599a4BF7B67Ee9E6b053ce6667c7f4c154A8";

const kalp = new web3.eth.Contract(abi, address);

export default kalp;
