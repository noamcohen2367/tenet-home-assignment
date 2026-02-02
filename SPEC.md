expectd result-- an app with two main pages and one exra one

1. alert inbox - a screen with list of security alerts
2. alert details - lead from the alert inbox page -> when i press on one of the alerts in the inbox i lead to alert details
3. Suppress Future Alerts - aks what they mean by that
   this i need to figure out: where the data is coming from? dummy data or fatch? how to modify the inbox with new security alerts?
   ill think i use for this project ant design for the inbox - they have the filter and hanle no data.
   step by step:

- Create a vite app
- Clear all the unrelevant file from the app
- I took from other proj I did the stratrue of the routes and the pages and created alerts and alerts/:id routes.
- I read the documentation of the ant table component and import it to my project with dummy data just to see that its actually work
- Now I’m changing the column according to the assignment
- I ask chat gpt to create mock data for the alerts
- Now the table have data the mocks the real data
- I create a landing page to navigate to the inbox using react navigator and its leading to the inbox
- Now I want when I press on a row for it to direct to the alert details page
- Direct sucssefuly
- Now I’m handling the sort and filer logic
- Checked the everything works fine and adding loader
- Adding text for ‘no data to show’

Now Im figuring out what the details page should look like, which element should be displayed and and the functional parts

Lets get the data by the id of the alert

I’ll add all the info I need to constants that it’ll be easier to continue developing the app -> No I didn’t do that (I just used one unrelevant)

Im building the html structure of the page

Now adding some css to make It look nicer.

Im importing some react icons to make the app more user friendly

Now im arranging the layout to be more prettier and adding more css

Now im checking what the part of Evidence Items should be

Ive notice I didn’t took care of the Acknowledge action part now im fixing it

I choose the loading-state approach over the optimistic update approach because it keep the implementation simple and avoid
rollback logic in case of failures.

Adding the Evidence list from the mock data to the page

I added a suppers rule from using ant design form

Now lets to the self testing.

Writing them in the QA file.
