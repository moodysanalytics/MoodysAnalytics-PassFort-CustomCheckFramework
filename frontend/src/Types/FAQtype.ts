export type FAQtype = {
    question: string;
    answer: string;
}

export const FAQs: FAQtype[] = [
    {question: "What is a Bvdid?", answer: "BvD ID is a unique identifier for an entity in the Orbis database. It is a 9 digit number that is used to identify an entity in the Orbis database."},
    {question: "What is an Entity?", answer: "An entity is the term PassFort uses to define the company, person, or other organization that is being checked."},
    {question: "Can you explain the differences between a Check, Task, Product, and Smart Policy?", answer: "A Check is a single request to run a check on an entity. A Task is a collection of checks that are run on an entity. A Product is a collection of tasks that are run on an entity. A Smart Policy is a collection of products that are run on an entity."},
    {question: "Why can't I pass my check data directly back through PassFort?", answer: "PassFort has strict requirements for what may be passed to it as a 'Check Result'. This helps ensure the security of the environment. Our workaround allows you to include an identifier as a query parameter, and make an API call to grab the necessary data on iFrame render."},
    {question: "How do I add my application's UI to this check?", answer: "We've included a step-by-step guide for where to go from here, available to you under 'Next Steps' in the README.md"},
    {question: "How will the UI know what entity to display data for?", answer: "After saving your check data, you may pass the database identifier of that check's data back through PassFort as a query parameter. In our example code, we simply use the Bvdid of the organization to demonstrate this process, as we did not include a database in our example."},
]