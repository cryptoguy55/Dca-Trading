import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Table from 'components/Table'
import Card from '@material-ui/core/Card';
import * as normalizer from 'utils/normalizers';
const getCurrencyCode = (currency) => {
    let normalizedCode = normalizer.normalizeCurrencyCodeXummImpl(currency);
    if(!normalizedCode || normalizedCode.trim().length == 0)
      return currency
    else
      return normalizedCode
  }

const Tokens = () => {
    const { t } = useTranslation();
    const [ tokenList, setTokenList ] = useState([])
    const [ tokenIndex, setTokenIndex ] = useState({})
    const [ isloading, setIsloading ] = useState(true)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/token-llist`)
        .then( ({ data })=> {
            let index = {};
            index.ledger_index= data.ledger_index            
            index.ledger_hash= data.ledger_hash            
            index.ledger_close_ms= data.ledger_close_ms
            let list = [], issuedTokens = 0, issuedAccounts = 0;            
            Object.keys(data.issuers).forEach((key) => {
                let token = data.issuers[key].tokens
                let dataList =  data.issuers[key].data
                let resolvedBy = dataList.resolvedBy
                let verified = dataList.verified
                let username = dataList.username
                let domain = data.domain
                let twitter = dataList.twitter
                token.forEach( element => {
                    list.push({
                        account: key,
                        currency: getCurrencyCode(element.currency),
                        amount: element.amount,
                        trustlines: element.trustlines,
                        offers: element.offers,
                        username: username,
                        resolvedBy: resolvedBy,
                        verified: verified,
                        domain: domain,
                        twitter: twitter,
                        kyc: dataList.kyc,
                        created: element.created
                    })
                    issuedTokens++
                })
                issuedAccounts++ 
                
            });
            setTokenList([ ...list ])
            setTokenIndex({ ...index, issuedTokens: issuedTokens, issuedAccounts: issuedAccounts})
            setIsloading(false)
        })
        .catch((err) => {
            setIsloading(false)
        })
    }, []);
    console.log(tokenList)
    return (
    <>
        <Card className="p-8 leading-loose">
            <p className="text-lg font-black">The below token table is based on XRP Ledger:</p>
            <div className="flex line ">
                <div style={{width: "250px"}}>
                    Ledger Index: <br/> 	
                    Ledger Hash: <br/>	
                    Ledger Close Time:<br/>     
                    Additional stats:<br/>
                    Unique accounts issuing tokens:<br/>
                    Issued tokens: 	
                </div>
                <div>
                    <p>{tokenIndex.ledger_index}</p>
                    <p>{tokenIndex.ledger_hash}</p>
                    <p>{tokenIndex.ledger_close_ms}</p>
                    <br/>
                    <p>{tokenIndex.issuedAccounts}</p>
                    <p>{tokenIndex.issuedTokens}</p>
                </div>
            </div>
        </Card><br/>
        <Card>
            <Table data={tokenList} isloading={isloading}/>
        </Card>
    </>
    );
  }
  
  export default Tokens; 