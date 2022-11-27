- hardhat 환경설치
> npx hardhat init

- hardhat 테스트넷 LocalHost 구축
> npx hardhat node

- Solidity 컴파일
> npx hardhat compile

- TEST 하는 방법
> npx hardhat test

- Deploy 하는 방법
> npx hardhat run scripts/[FILE_NAME] --network [hardhat.config에 정의한 네트워크명 입력]

- 이더스캔 Verify
> npm i --save-dev @nomiclabs/hardhat-etherscan
> env $(cat .env) npx hardhat verify --network mumbai "MyERC721 Contract Address"