import { AsyncStorage } from "react-native";
const KEY_FLASHCARDS = "flashcards: decks";
const initialData = {
	Programming: {
		title: "Programming",
		questions: [
			{
				question: "Imperative Programming is same as declarative Programing",
				answer: "No",
				correctAnswer: "false",
			},
			{
				question: "Memory allocation in Heap is contagious",
				answer: "No it's Random",
				correctAnswer: "false",
			},
		],
	},

	Psychology: {
		title: "Psychology",
		questions: [
			{
				question: "Carl Jung is the father of analytical psychology?",
				answer: "Yes he is!",
				correctAnswer: "true",
			},
			{
				question: "Jordan B. Peterson is from Australia?",
				answer: "No he is from Canada",
				correctAnswer: "false",
			},
		],
	},
};
export const getData = () => {
	return initialData;
};

export const getDecks = (decks) => {
	return AsyncStorage.getItem(KEY_FLASHCARDS).then((results) => {
		if (results === null) {
			AsyncStorage.setItem(KEY_FLASHCARDS, JSON.stringify(initialData));
			return initialData;
		} else {
			return results;
		}
	});
};

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(
		KEY_FLASHCARDS,
		JSON.stringify({
			[title]: {
				title: title,
				questions: [],
			},
		})
	);
}
export function addCardToDeck(name, card) {
	return AsyncStorage.getItem(KEY_FLASHCARDS)
		.then((results) => JSON.parse(results))
		.then((results) => {
			results[name].questions.push(card);
			AsyncStorage.setItem(KEY_FLASHCARDS, JSON.stringify(results));
			return results;
		});
}
export function remove() {
	return AsyncStorage.removeItem(KEY_FLASHCARDS);
}

