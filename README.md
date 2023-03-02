## How to Run:
#### The best way:
	Make sure having Dockerhub installed on your machine, then move into root folder simply run 
    `docker-compose up` 
    and it will build images and startup container.
#### Manually;
    Once repo clone finish, make sure node version is 16+ on local env 
    (mine is 18.14.2 on Windows 11), and then `npm install` in root folder and `npm start` afterwards. 

Start with UI: http://localhost:4000/


---
- Able to display all spells on page (paginate)
- Able to check a specific spell in quick view / detail view
- Able to add spells to likes list
- Support spells remove both on "spell likes list" and "spells list"
- Able to persist & load data with local storage
- Data fetching with Redux RTK
- Mobile responsive design