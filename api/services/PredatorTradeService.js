module.exports = {
	predators_data_alerts:function(exchange_updated){
		var _ = require('lodash');
		var moment = require('moment');
		
		//var roomName=request.param('roomName');
		var currencies=['btc','usd','eth','bch','gbp','ltc','eur','etc'];
		var currencies_temp=currencies;
		
		ExchangeList.find({select:['id','name'],is_exchange:'yes'},function(err, exchange_list){
			if(_.isEmpty(exchange_list)){exchange_list=[];}
			return Promise.all(exchange_list.map((exchange) => {
				return new Promise(function(resolve,reject){
					var tickers=ExchangeTickersAlerts.findOne();
					tickers.where({exchange_id:exchange.id});
					tickers.sort('id DESC');
					tickers.then(function(tickers){
						if(!_.isEmpty(tickers)){
							var date_created=moment(tickers.date_created).format('YYYY-MM-DD HH:mm:ss');
							var tickers=tickers.tickers;
							switch(exchange.name){
								case 'gdax':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										var tickers2=_.filter(tickers,{base_currency:_.toUpper(currency)});
										if(!_.isEmpty(tickers2)){
											_.forEach(currencies_temp,function(currency_temp){
												var tickers_match=_.filter(tickers2,{quote_currency:_.toUpper(currency_temp)});
												if(!_.isEmpty(tickers_match)){
													tickers_match=_.head(tickers_match);
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.price,exchange:exchange.name,date_created:date_created}});
												}
											});
										}
									});
									return resolve(temp_array);
								break;
								case 'bittrex':
									var temp_array=[];
									tickers=tickers.result;
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{MarketName:_.toUpper(currency+'-'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.Bid,sell:tickers_match.Ask,volume:tickers_match.Volume,ask:tickers_match.Ask,bid:tickers_match.Bid,last:tickers_match.Last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitfinex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
										var tickers_match=_.filter(tickers,{product_id:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last_price,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'hitbtc':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'gate':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.highestBid,sell:tickers_match.lowestAsk,volume:tickers_match.baseVolume,ask:tickers_match.lowestAsk,bid:tickers_match.highestBid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'kuna':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'okex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.buy,sell:tickers_match.ticker.sell,volume:tickers_match.ticker.vol,ask:tickers_match.ticker.sell,bid:tickers_match.ticker.buy,last:tickers_match.ticker.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'binance':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bidPrice,sell:tickers_match.askPrice,volume:tickers_match.volume,ask:tickers_match.askPrice,bid:tickers_match.bidPrice,last:tickers_match.lastPrice,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'huobi':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.tick.bid[0],sell:tickers_match.tick.ask[0],volume:tickers_match.tick.vol,ask:tickers_match.tick.ask[0],bid:tickers_match.tick.bid[0],last:tickers_match.tick.bid[0],exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'gemini':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.vol,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'kraken':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitflyer':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+'_'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_bid,sell:tickers_match.best_ask,volume:tickers_match.volume,ask:tickers_match.best_ask,bid:tickers_match.best_bid,last:tickers_match.best_bid,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bithumb':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.volume_1day,ask:tickers_match.sell_price,bid:tickers_match.buy_price,last:tickers_match.buy_price,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;	
								case 'bitstamp':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitz':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'lbank':
									var temp_array=[];
									//AS THERE IS NO ASK/BID OR BUY/SELL DATA HERE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.ticker.low,sell:tickers_match.ticker.latest,volume:tickers_match.ticker.vol,last:tickers_match.ticker.latest,exchange:exchange.name,date_created:date_created}});
											}
										});
									});*/
									return resolve(temp_array);
									
								break;
								case 'coinone':
									var temp_array=[];
									//AS THERE IS NO ASK/BID OR BUY/SELL DATA HERE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.low,sell:tickers_match.last,volume:tickers_match.volume,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});*/
									return resolve(temp_array);
								break;
								case 'wex':
									var temp_array=[];
									//AS IT IS A CRAP EXCHANGE
									/*_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});*/
									return resolve(temp_array);					
								break;
								case 'exmo':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+'_'+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy_price,sell:tickers_match.sell_price,volume:tickers_match.vol,ask:tickers_match.sell_price,bid:tickers_match.buy_price,last:tickers_match.last_trade,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'liqui':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.buy,sell:tickers_match.sell,volume:tickers_match.vol,ask:tickers_match.sell,bid:tickers_match.buy,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'korbit':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:currency+'_'+currency_temp});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'bitmex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{symbol:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												if(!_.isEmpty(tickers_match.askPrice) && !_.isEmpty(tickers_match.bidPrice)){
													temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bidPrice,sell:tickers_match.askPrice,volume:tickers_match.totalVolume,ask:tickers_match.askPrice,bid:tickers_match.bidPrice,last:tickers_match.lastPrice,exchange:exchange.name,date_created:date_created}});
												}
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'livecoin':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.best_bid,sell:tickers_match.best_ask,volume:tickers_match.volume,ask:tickers_match.best_ask,bid:tickers_match.best_bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								case 'cex':
									var temp_array=[];
									_.forEach(currencies,function(currency){
										_.forEach(currencies_temp,function(currency_temp){
											var tickers_match=_.filter(tickers,{product:_.toUpper(currency+currency_temp)});
											if(!_.isEmpty(tickers_match)){
												tickers_match=_.head(tickers_match);
												temp_array.push({product:currency+'_'+currency_temp,record:{buy:tickers_match.bid,sell:tickers_match.ask,volume:tickers_match.volume,ask:tickers_match.ask,bid:tickers_match.bid,last:tickers_match.last,exchange:exchange.name,date_created:date_created}});
											}
										});
									});
									return resolve(temp_array);
								break;
								default:
									return resolve([]);
								break;
							}
						}
						else{
							return resolve([]);
						}
					}).catch(err => { return resolve([]);});
				});	
			})).
			then(response => {
				var temp_data_array=[];
				var return_array=[];
				_.forEach(response,function(exchange_data){
					_.forEach(exchange_data,function(data){
						if(_.isEmpty(_.filter(temp_data_array,{product:data.product}))){
							temp_data_array.push({product:data.product,records:[data.record]});
						}
						else{
							_.forEach(temp_data_array,function(return_data){
								if(return_data.product==data.product){
									return_data.records.push(data.record);
								}
							});
						}
					});
				});
				
				ExchangeDataService.fxPairList().then(response=>{
					_.forEach(temp_data_array,function(data){
						if(data.records.length>1){
							data.records.sort(function(a,b){ if(parseFloat(a.buy)>parseFloat(b.buy)){return 1;}else {return -1;}});
							var buy_from=data.records[0];
							data.records.sort(function(a,b){ if(parseFloat(a.sell)>parseFloat(b.sell)){return -1;}else {return 1;}});
							var sell_at=data.records[0];
							if(buy_from.exchange!=sell_at.exchange && buy_from.buy>0 && sell_at.sell>0 && (buy_from.exchange==exchange_updated || sell_at.exchange==exchange_updated)){
								if(_.indexOf(response.data,data.product)==-1){
									return_array.push({product:data.product,buy_from:buy_from,sell_at:sell_at});
								}
							}
						}
					});
					sails.sockets.blast('predator_alert', {data:return_array,exchange_list:exchange_list});
					//sails.sockets.broadcast(roomName, 'predator_alert', {data:return_array,exchange_list:exchange_list});
				}).catch( err => {});
				
			}).
			catch(err => {});
		});			
	}
};