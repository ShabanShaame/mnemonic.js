
function getBalance(chain,address,callback) {

    var shorthand = ''
    var url = 'https://rest.bitcoin.com/v2/address/details/bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c';

    if (chain === 'bitcoin'){

        shorthand = 'btc' ;
         url = "https://chain.api."+shorthand+".com/v3/address/"+address;
    }

    if (chain === 'bch' || chain === 'bitcoincash' ){

        shorthand = 'bch' ;
         url = 'https://rest.bitcoin.com/v2/address/details/'+address;
    }

    $.ajax({
        url: url, success: function (result) {
            console.log("chain ???"+chain)
            callback(result,chain);
            return result ;
        }
    });
}