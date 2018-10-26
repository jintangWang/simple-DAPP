import './index.html';
import './main.css';
import $ from 'jquery';

let web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

let abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "Instructor",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInfo",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
let infoContract = web3.eth.contract(abi);

// 合约地址
let contractAddress = '0xd984adf330131cb5226927d225493f533bc80cd2';
let info = infoContract.at(contractAddress);

let instructorEvent = info.Instructor();
instructorEvent.watch(function(error, result) {
    if (!error) {
        console.log(result)
        $("#info").html(result.args.name + ' (' + result.args.age + ' years old)');
    } else {
        console.log(error);
    }
});

// info.getInfo(function(error, result){
//     if(!error)
//         {
//             $("#info").html(result[0]+' ('+result[1]+' years old)');
//             console.log('result', result);
//         }
//     else
//         console.error('error', error);
// });

$("#button").click(function() {
    console.log('click', info)
    info.setInfo($("#name").val(), $("#age").val());
});
