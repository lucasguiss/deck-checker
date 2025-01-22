"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type CardMap = { [key: string]: number };

export default function Checker() {
    const [cards, setCards] = useState("")
    const [deck, setDeck] = useState("")
    const [result, setResult] = useState("")
    const [resultMessage, setResultMessage] = useState("")
    const [compareCardNumber, setCompareCardNumber] = useState(false as CheckedState)

    const isSubset = (map1: CardMap, map2: CardMap): boolean => {
        for (const key in map1) {
            if (!(key in map2) || map1[key] > map2[key]) {
                return false;
            }
        }
        return true;
    }

    const getCardMap = (cards: string, checkCardNumbers: boolean) => {
        const cardMap: CardMap = {};

        const lines = cards.split('\n');

        for (const line of lines) {
            let match = null
            if (checkCardNumbers) {
                match = line.match(/^(\d+)\s+(.+)$/);
            } else {
                match = line.match(/^(\d+)\s+(.+?)\s+(?:[A-Z]+\s+\d+)?$/);
            }
            if (match) {
                const quantity = parseInt(match[1], 10);
                const cardName = match[2];
                cardMap[cardName] = (cardMap[cardName] || 0) + quantity;
            }
        }

        return cardMap;
    }

    const findMissingCards = (map1: CardMap, map2: CardMap): CardMap => {
        const missingCards: CardMap = {};

        for (const key in map1) {
            if (!(key in map2)) {
                missingCards[key] = map1[key];
            } else if (map1[key] > map2[key]) {
                missingCards[key] = map1[key] - map2[key];
            }
        }

        return missingCards;
    }

    const formatMissingCards = (cards: string) => {
        const cardsAsJson: Record<string, string> = JSON.parse(cards)
        const names = Object.keys(cardsAsJson)
        const quantities = Object.values(cardsAsJson)

        let text = ""

        for (const name of names) {
            const index = names.indexOf(name)
            text += `Card: ${name}, amount: ${quantities[index]} \n`
        }
        return text
    }

    const check = () => {
        const inputCards = getCardMap(cards, compareCardNumber as boolean);
        const inputDeck = getCardMap(deck, compareCardNumber as boolean)

        const canBuildDeck = isSubset(inputDeck, inputCards)

        if (!canBuildDeck) {
            const missing = findMissingCards(inputDeck, inputCards)
            setResultMessage("You need the cards below:")
            setResult(formatMissingCards(JSON.stringify(missing)))
        } else {
            setResultMessage("You can build it!")
            setResult("")
        }

    }

    return (
        <Card className="w-[900px]">
            <CardContent className="p-4">
                <div className="grid gap-4">
                    <div id="input">
                        <div className="grid w-full gap-1.5">
                            <Label>Input your deck list here</Label>
                            <Textarea
                                value={cards}
                                placeholder="Input all your cards here."
                                onChange={(e) => setCards(e.target.value)}
                            />
                        </div>
                        <div className="grid w-full gap-1.5 mt-4">
                            <Label>Input your desired deck here</Label>
                            <Textarea
                                value={deck}
                                placeholder="Input the deck you want here."
                                onChange={(e) => setDeck(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox
                                checked={compareCardNumber}
                                onCheckedChange={setCompareCardNumber}
                            />
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Check card numbers in the comparison
                            </label>
                        </div>
                    </div>
                    <div id="action">
                        <Button disabled={cards == "" || deck == ""} onClick={check}>Check</Button>
                    </div>
                    <div id="result">
                        <div className="grid w-full gap-1.5">
                            <Label>{resultMessage}</Label>
                            <Textarea
                                value={result}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}