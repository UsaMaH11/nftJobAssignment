// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNftToken is ERC721, ERC721URIStorage, Ownable {
    IERC20 public tokenAddress;
    uint256 public rate = (1 * 10**18) / 2;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(address _tokenAddress) ERC721("MyToken", "MTK") {
        tokenAddress = IERC20(_tokenAddress);
    }

    function safeMint(string memory uri) public returns (uint256) {
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function withdrawToken() public onlyOwner {
        tokenAddress.transfer(
            msg.sender,
            tokenAddress.balanceOf(address(this))
        );
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
