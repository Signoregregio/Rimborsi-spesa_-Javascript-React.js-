let maxRefundable = [
	{
		ruolo: "Presidente",
		taxi: 300,
		vitto: 300,
		hotel: 300,
		treno: 300,
	},
	{
		ruolo: "Manager",
		taxi: 100,
		vitto: 150,
		hotel: 200,
		treno: 85,
	},
	{
		ruolo: "Dipendente",
		taxi: 20,
		vitto: 10,
		hotel: 100,
		treno: 15,
	},
	{
		ruolo: "Segretaria",
		taxi: 20,
		vitto: 10,
		hotel: 0,
		treno: 15,
	},
]


let users = [
	({
		createdAt: 1665557198,
		name: "Gabriele",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/15.jpg",
		role: "Presidente",
		"primaryKey": "1",
	},
	{
		createdAt: 1665557138,
		name: "Daniele",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1085.jpg",
		role: "Dipendente",
		"primaryKey": "2",
	},
	{
		createdAt: 1665557078,
		name: "Lorenzo",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/234.jpg",
		role: "Dipendente",
		"primaryKey": "3",
	},
	{
		createdAt: 1665557018,
		name: "Luca",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1131.jpg",
		role: "Dipendente",
		"primaryKey": "4",
	},
	{
		createdAt: 1665556898,
		name: "Francesco",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1222.jpg",
		role: "Manager",
		"primaryKey": "6",
	},
	{
		createdAt: 1665556838,
		name: "Matteo",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg",
		role: "Dipendente",
		"primaryKey": "7",
	},
	{
		createdAt: 1665556778,
		name: "Filippo",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1027.jpg",
		role: "Segretaria",
		"primaryKey": "8",
	},
	{
		createdAt: 1665556718,
		name: "Chiara",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/362.jpg",
		role: "Segretaria",
		"primaryKey": "9",
	},
	{
		createdAt: 1665556658,
		name: "Leonardo",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/659.jpg",
		role: "Manager",
		"primaryKey": "10",
	},
	{
		createdAt: 1665568785,
		name: "Fabio",
		avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/277.jpg",
		role: "Manager",
		"primaryKey": "5",
	})
]




let spesa = [
	{
		"0": {		
			"dateRefund": "2022-10-08",
			"type": "Vitto",
			"amount": "500",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 300,
			"primaryKey": 0
		},
		"1": {
			"dateRefund": "2022-10-08",
			"type": "Vitto",
			"amount": "500",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 300,
			"primaryKey": 1
		},
		"2": {
			"dateRefund": "2022-10-08",
			"type": "Hotel",
			"amount": "280",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 280,
			"primaryKey": 2
		},
		"3": {
			"dateRefund": "2022-10-08",
			"type": "Taxi",
			"amount": "100",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 100,
			"primaryKey": 3
		},
		"id": 7,
		"userId": 1,
	},
	{
		"0": {
			"dateRefund": "2022-07-16",
			"type": "Vitto",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 32
		},
		"1": {
			"dateRefund": "2022-07-16",
			"type": "Vitto",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 33
		},
		"2": {
			"dateRefund": "2022-07-16",
			"type": "Vitto",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 34
		},
		"3": {
			"dateRefund": "2022-07-21",
			"type": "Treno",
			"amount": "2",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 2,
			"primaryKey": 35
		},
		"4": {
			"dateRefund": "2022-07-21",
			"type": "Treno",
			"amount": "2",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 2,
			"primaryKey": 36
		},
		"5": {
			"dateRefund": "2022-07-21",
			"type": "Treno",
			"amount": "2",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 2,
			"primaryKey": 37
		},
		"6": {
			"dateRefund": "2022-07-21",
			"type": "Vitto",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 38
		},
		"7": {
			"dateRefund": "2022-07-24",
			"type": "Vitto",
			"amount": "1",
			"ticket": "No",
			"state": "Approvata",
			"refund": 1,
			"primaryKey": 24
		},
		"8": {
			"dateRefund": "2022-07-24",
			"type": "Vitto",
			"amount": "1",
			"ticket": "No",
			"state": "Approvata",
			"refund": 1,
			"primaryKey": 25
		},
		"9": {
			"dateRefund": "2022-07-24",
			"type": "Vitto",
			"amount": "1",
			"ticket": "No",
			"state": "Approvata",
			"refund": 1,
			"primaryKey": 26
		},
		"10": {
			"dateRefund": "2022-07-24",
			"type": "Vitto",
			"amount": "1",
			"ticket": "No",
			"state": "Approvata",
			"refund": 1,
			"primaryKey": 27
		},
		"id": 9,
		"userId": 5,
	},
	{
		"0": {
			"dateRefund": "2022-03-10",
			"type": "Hotel",
			"amount": "12",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 12,
			"primaryKey": 41
		},
		"1": {
			"dateRefund": "2022-03-04",
			"type": "Treno",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 47
		},
		"2": {
			"dateRefund": "2022-03-19",
			"type": "Treno",
			"amount": "25",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 25,
			"primaryKey": 46
		},
		"3": {
			"dateRefund": "2022-03-02",
			"type": "Vitto",
			"amount": "50",
			"ticket": "No",
			"state": "Non approvata",
			"refund": 0,
			"primaryKey": 44
		},
		"4": {
			"dateRefund": "2022-03-31",
			"type": "Hotel",
			"amount": "50",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 50,
			"primaryKey": 45
		},
		"5": {
			"dateRefund": "2022-03-18",
			"type": "Hotel",
			"amount": "80",
			"ticket": "No",
			"state": "Non approvata",
			"refund": 0,
			"primaryKey": 43
		},
		"6": {
			"dateRefund": "2022-03-31",
			"type": "Vitto",
			"amount": "150",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 150,
			"primaryKey": 10000
		},
		"id": 13,
		"userId": 3,
	},
	{
		"0": {
			"dateRefund": "2022-10-06",
			"type": "Taxi",
			"amount": "1500",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 100,
			"primaryKey": 0
		},
		"1": {
			"dateRefund": "2022-10-06",
			"type": "Treno",
			"amount": "500",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 85,
			"primaryKey": 1
		},
		"2": {
			"dateRefund": "2022-10-06",
			"type": "Vitto",
			"amount": "1000",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 150,
			"primaryKey": 2
		},
		"3": {
			"dateRefund": "2022-10-12",
			"type": "Hotel",
			"amount": "100",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 100,
			"primaryKey": 6
		},
		"id": 16,
		"userId": 5,
	},
	{
		"0": {
			"dateRefund": "2022-09-07",
			"type": "Hotel",
			"amount": "14",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 14,
			"primaryKey": 90
		},
		"1": {
			"dateRefund": "2022-09-07",
			"type": "Hotel",
			"amount": "14",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 14,
			"primaryKey": 91
		},
		"2": {
			"dateRefund": "2022-09-16",
			"type": "Hotel",
			"amount": "24",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 24,
			"primaryKey": 92
		},
		"3": {
			"dateRefund": "2022-09-23",
			"type": "Treno",
			"amount": "100",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 85,
			"primaryKey": 92
		},
		"id": 19,
		"userId": 5,
	},
	{
		"0": {
			"dateRefund": "2022-02-03",
			"type": "Vitto",
			"amount": "20",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 20,
			"primaryKey": 20
		},
		"1": {
			"dateRefund": "2022-02-03",
			"type": "Vitto",
			"amount": "230",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 150,
			"primaryKey": 21
		},
		"2": {
			"dateRefund": "2022-02-11",
			"type": "Vitto",
			"amount": "15",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 15,
			"primaryKey": 23
		},
		"3": {
			"dateRefund": "2022-02-11",
			"type": "Vitto",
			"amount": "120",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 120,
			"primaryKey": 24
		},
		"4": {
			"dateRefund": "2022-02-11",
			"type": "Vitto",
			"amount": "15",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 15,
			"primaryKey": 25
		},
		"5": {
			"dateRefund": "2022-02-11",
			"type": "Vitto",
			"amount": "120",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 120,
			"primaryKey": 26
		},
		"6": {
			"dateRefund": "2022-02-15",
			"type": "Hotel",
			"amount": "90",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 90,
			"primaryKey": 27
		},
		"7": {
			"dateRefund": "2022-02-17",
			"type": "Vitto",
			"amount": "50",
			"ticket": "Sì",
			"state": "Approvata",
			"refund": 50,
			"primaryKey": 28
		},
		"8": {
			"dateRefund": "2022-02-08",
			"type": "Taxi",
			"amount": "50",
			"ticket": "No",
			"state": "Non approvata",
			"refund": 0,
			"primaryKey": 22
		},
		"id": 20,
		"userId": 5,
	}
];



let spesa1 = [
	{
	 "0": {
	  "dateRefund": "2022-10-08",
	  "type": "Vitto",
	  "amount": "500",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 300,
	  "primaryKey": 0
	 },
	 "1": {
	  "dateRefund": "2022-10-08",
	  "type": "Vitto",
	  "amount": "500",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 300,
	  "primaryKey": 1
	 },
	 "2": {
	  "dateRefund": "2022-10-08",
	  "type": "Hotel",
	  "amount": "280",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 280,
	  "primaryKey": 2
	 },
	 "3": {
	  "dateRefund": "2022-10-08",
	  "type": "Taxi",
	  "amount": "100",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 100,
	  "primaryKey": 3
	 },
	 "id": "7",
	 "userId": "1"
	},
	{
	 "0": {
	  "dateRefund": "2022-07-16",
	  "type": "Vitto",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 32
	 },
	 "1": {
	  "dateRefund": "2022-07-16",
	  "type": "Vitto",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 33
	 },
	 "2": {
	  "dateRefund": "2022-07-16",
	  "type": "Vitto",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 34
	 },
	 "3": {
	  "dateRefund": "2022-07-21",
	  "type": "Treno",
	  "amount": "2",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 2,
	  "primaryKey": 35
	 },
	 "4": {
	  "dateRefund": "2022-07-21",
	  "type": "Treno",
	  "amount": "2",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 2,
	  "primaryKey": 36
	 },
	 "5": {
	  "dateRefund": "2022-07-21",
	  "type": "Treno",
	  "amount": "2",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 2,
	  "primaryKey": 37
	 },
	 "6": {
	  "dateRefund": "2022-07-21",
	  "type": "Vitto",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 38
	 },
	 "7": {
	  "dateRefund": "2022-07-24",
	  "type": "Vitto",
	  "amount": "1",
	  "ticket": "No",
	  "state": "Approvata",
	  "refund": 1,
	  "primaryKey": 24
	 },
	 "8": {
	  "dateRefund": "2022-07-24",
	  "type": "Vitto",
	  "amount": "1",
	  "ticket": "No",
	  "state": "Approvata",
	  "refund": 1,
	  "primaryKey": 25
	 },
	 "9": {
	  "dateRefund": "2022-07-24",
	  "type": "Vitto",
	  "amount": "1",
	  "ticket": "No",
	  "state": "Approvata",
	  "refund": 1,
	  "primaryKey": 26
	 },
	 "10": {
	  "dateRefund": "2022-07-24",
	  "type": "Vitto",
	  "amount": "1",
	  "ticket": "No",
	  "state": "Approvata",
	  "refund": 1,
	  "primaryKey": 27
	 },
	 "id": "9",
	 "userId": "5"
	},
	{
	 "0": {
	  "dateRefund": "2022-03-10",
	  "type": "Hotel",
	  "amount": "12",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 12,
	  "primaryKey": 41
	 },
	 "1": {
	  "dateRefund": "2022-03-04",
	  "type": "Treno",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 47
	 },
	 "2": {
	  "dateRefund": "2022-03-19",
	  "type": "Treno",
	  "amount": "25",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 25,
	  "primaryKey": 46
	 },
	 "3": {
	  "dateRefund": "2022-03-02",
	  "type": "Vitto",
	  "amount": "50",
	  "ticket": "No",
	  "state": "Non approvata",
	  "refund": 0,
	  "primaryKey": 44
	 },
	 "4": {
	  "dateRefund": "2022-03-31",
	  "type": "Hotel",
	  "amount": "50",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 50,
	  "primaryKey": 45
	 },
	 "5": {
	  "dateRefund": "2022-03-18",
	  "type": "Hotel",
	  "amount": "80",
	  "ticket": "No",
	  "state": "Non approvata",
	  "refund": 0,
	  "primaryKey": 43
	 },
	 "6": {
	  "dateRefund": "2022-03-31",
	  "type": "Vitto",
	  "amount": "150",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 150,
	  "primaryKey": 43
	 },
	 "id": "13",
	 "userId": "3"
	},
	{
	 "0": {
	  "dateRefund": "2022-10-06",
	  "type": "Taxi",
	  "amount": "1500",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 100,
	  "primaryKey": 0
	 },
	 "1": {
	  "dateRefund": "2022-10-06",
	  "type": "Treno",
	  "amount": "500",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 85,
	  "primaryKey": 1
	 },
	 "2": {
	  "dateRefund": "2022-10-06",
	  "type": "Vitto",
	  "amount": "1000",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 150,
	  "primaryKey": 2
	 },
	 "3": {
	  "dateRefund": "2022-10-12",
	  "type": "Hotel",
	  "amount": "100",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 100,
	  "primaryKey": 6
	 },
	 "id": "16",
	 "userId": "5"
	},
	{
	 "0": {
	  "dateRefund": "2022-09-07",
	  "type": "Hotel",
	  "amount": "14",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 14,
	  "primaryKey": 90
	 },
	 "1": {
	  "dateRefund": "2022-09-07",
	  "type": "Hotel",
	  "amount": "14",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 14,
	  "primaryKey": 91
	 },
	 "2": {
	  "dateRefund": "2022-09-16",
	  "type": "Hotel",
	  "amount": "24",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 24,
	  "primaryKey": 92
	 },
	 "3": {
	  "dateRefund": "2022-09-23",
	  "type": "Treno",
	  "amount": "100",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 85,
	  "primaryKey": 92
	 },
	 "id": "19",
	 "userId": "5"
	},
	{
	 "0": {
	  "dateRefund": "2022-02-03",
	  "type": "Vitto",
	  "amount": "20",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 20,
	  "primaryKey": 20
	 },
	 "1": {
	  "dateRefund": "2022-02-03",
	  "type": "Vitto",
	  "amount": "230",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 150,
	  "primaryKey": 21
	 },
	 "2": {
	  "dateRefund": "2022-02-11",
	  "type": "Vitto",
	  "amount": "15",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 15,
	  "primaryKey": 23
	 },
	 "3": {
	  "dateRefund": "2022-02-11",
	  "type": "Vitto",
	  "amount": "120",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 120,
	  "primaryKey": 24
	 },
	 "4": {
	  "dateRefund": "2022-02-11",
	  "type": "Vitto",
	  "amount": "15",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 15,
	  "primaryKey": 25
	 },
	 "5": {
	  "dateRefund": "2022-02-11",
	  "type": "Vitto",
	  "amount": "120",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 120,
	  "primaryKey": 26
	 },
	 "6": {
	  "dateRefund": "2022-02-15",
	  "type": "Hotel",
	  "amount": "90",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 90,
	  "primaryKey": 27
	 },
	 "7": {
	  "dateRefund": "2022-02-17",
	  "type": "Vitto",
	  "amount": "50",
	  "ticket": "Sì",
	  "state": "Approvata",
	  "refund": 50,
	  "primaryKey": 28
	 },
	 "8": {
	  "dateRefund": "2022-02-08",
	  "type": "Taxi",
	  "amount": "50",
	  "ticket": "No",
	  "state": "Non approvata",
	  "refund": 0,
	  "primaryKey": 22
	 },
	 "id": "20",
	 "userId": "5"
	}
   ]

let user2 = [
	{
	 "createdAt": "2022-12-05T15:06:40.171Z",
	 "name": "Daniele",
	 "role": "Presidente",
	 "password": "1",
	 "id": "1"
	},
	{
	 "createdAt": "2022-12-06T03:49:40.560Z",
	 "name": "Gabriele",
	 "role": "Dipendente",
	 "password": "2",
	 "id": "2"
	},
	{
	 "createdAt": "2022-12-06T08:36:54.512Z",
	 "name": "Miss Margarita Kautzer",
	 "role": "Lorenzo",
	 "password": "3",
	 "id": "3"
	},
	{
	 "createdAt": "2022-12-06T03:33:26.722Z",
	 "name": "Gary Wiegand",
	 "role": "Luca",
	 "password": "4",
	 "id": "4"
	},
	{
	 "createdAt": "2022-12-06T06:46:02.197Z",
	 "name": "Francesco",
	 "role": "Manager",
	 "password": "6",
	 "id": "6"
	},
	{
	 "createdAt": "2022-12-05T18:39:32.560Z",
	 "name": "Matteo",
	 "role": "Dipendente",
	 "password": "7",
	 "id": "7"
	},
	{
	 "createdAt": "2022-12-06T01:01:14.841Z",
	 "name": "Filippo",
	 "role": "Segretaria",
	 "password": "8",
	 "id": "8"
	},
	{
	 "createdAt": "2022-12-05T17:29:03.392Z",
	 "name": "Chiara",
	 "role": "Segretaria",
	 "password": "9",
	 "id": "9"
	},
	{
	 "createdAt": "2022-12-06T12:54:43.734Z",
	 "name": "Leonardo",
	 "role": "Manager",
	 "password": "10",
	 "id": "10"
	},
	{
	 "createdAt": "2022-12-06T12:15:30.178Z",
	 "name": "Fabio",
	 "role": "Manager",
	 "password": "5",
	 "id": "5"
	}
   ]