# Workshop Booking Tool

A simple tool to make and manage bookings for different crafting spaces

## Screenshots

Signup page:
![Signup page](https://github.com/kr222/sei-project-4/assets/59068114/e9e8a5be-cb5e-425a-9b36-0424f9f9eb44)

Signin page:
![Signin page](https://github.com/kr222/sei-project-4/assets/59068114/e77eaa10-1d8c-484d-b284-92468adffb86)

Homepage calendar section:
![Homepage calendar section](https://github.com/kr222/sei-project-4/assets/59068114/ba665954-a073-4ad9-8572-3790842d6cd6)

Homepage user inventory section:
![Homepage user inventory section](https://github.com/kr222/sei-project-4/assets/59068114/3b5ffa20-ec01-4980-8d39-eccc90581477)

Create new booking as a user:
![Create new booking](https://github.com/kr222/sei-project-4/assets/59068114/7b482c17-5efb-4338-9229-e7d1430bf370)

Staff booking management:
![Staff booking management](https://github.com/kr222/sei-project-4/assets/59068114/a6c10b9c-20ec-4de3-8d1c-9964a7029a8c)

Staff inventory management:
![image](https://github.com/kr222/sei-project-4/assets/59068114/b740f724-e292-4d20-9f55-dac9d913abca)

Adding a new inventory item as a staff member
![Staff add new inventory item](https://github.com/kr222/sei-project-4/assets/59068114/e4efa077-e8da-4692-8384-72120c9291c0)

Admin user management:
![image](https://github.com/kr222/sei-project-4/assets/59068114/da5b411a-a6b6-4750-b36b-044d3499ac0f)

## Technologies used

- Postgresql
- Express
- React
- Node.js
- Material UI
- react-big-calendar
- date-fns

## Getting started

### As a user:

- The homepage allows a user to view all bookings made, and inventory of materials available
- A user is able to create a new booking, where it will be added to the calendar and displayed to everyone

### As a staff member:

- The staff page allows a staff member to see all bookings currently made in a list for easy management
- A staff member is able to edit booking dates (if a user calls in and wants to change their booking). It is also possible to delete a booking from this list
- The inventory list is different for a staff member, as it shows an additional column (Material ID) and the staff member can add new materials into the inventory. The quantities of the items can also be updated or deleted

### As an admin:

- The admin's main purpose at the moment is user management, so they are able to view a list of all the users registered on the site, edit their roles (change from user to staff, or admin), or delete the user from the database.

## Icebox items

- Associate bookings with user IDs so that it can display who made a particular booking in the calendar view
- Expand booking functionality by including a start time and end time, so that users can book a workshop for a specified number of hours
- An e-commerce section of the app where users can list their items crafted at the workshops for sale
- Integrate some sort of payment system (Stripe/Paypal) into the site for workshop bookings and the e-commerce section
- Image upload for materials and e-commerce

## References

- [Material UI](https://mui.com/material-ui/getting-started/)
- [date-fns](https://date-fns.org/v3.6.0/docs/format)
- [react-big-calendar](https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page)
- [PostgreSQL](https://www.postgresql.org/)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)

## .env variables

front-end:

```
VITE_SERVER=http://localhost:5001
```

back-end:

```
PGUSER=
PGPASSWORD=
PGHOST=127.0.0.1
PGPORT=5432
PGDATABASE=project4

ACCESS_SECRET=
REFRESH_SECRET=
```
