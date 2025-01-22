import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export function HowTo() {
    return (
        <div className="w-[900px] mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>Deck checker</CardTitle>
                    <CardDescription>Check if you can build your desired deck with you cards easily</CardDescription>
                    <Separator className="my-4"/>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">You just need to provide the lists with the format below:</p>
                    <code>
                        amount card_name
                    </code>

                    <p className="mt-4">Here is an example:</p>
                    <code>3 Regidrago V SIT 135</code>
                    <br />
                    <code>3 Regidrago VSTAR SIT 136</code>
                    <br />
                    <code>3 Teal Mask Ogerpon ex TWM 25</code>
                    <br />
                </CardContent>
            </Card>
        </div>
    )

}