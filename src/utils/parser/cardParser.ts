export default (card:string) => {
	try{
		const cardPattern = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[0-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/g
		const cardValues = card.replace(/\D/g, "|").split("|").filter(Boolean)
		const cardIndex = cardValues.indexOf(cardValues.filter(values => cardPattern.test(values)).find(Boolean))
		if (cardIndex == -1) return [false]
		const parsedCard = cardValues.slice(cardIndex)
		if (parsedCard[1].length >= 4) {
			parsedCard[3] = parsedCard[2]
			parsedCard[2] = parsedCard[1].slice(2,4)
			parsedCard[1] = parsedCard[1].slice(0,2)
		}	
		
		return [true, ...parsedCard]
	}catch(error){
		return [false]
	}
}