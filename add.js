// You drop your car off at the mechanic and you want the shop to 'call you back' when your car is fixed.
let carIsBroken = false;

const callCarOwner = () => console.log("Hello your car is done!");

const fixCar = (carIsBroken, callCarOwner) => {
  if (carIsBroken === true) {
    console.log("we are fixing the car")
    carIsBroken = false
    callCarOwner();
  }
  else if (carIsBroken === false) {
    console.log("Your car has no issues")
  } else {
    console.log("No car is available for fixing")
  }

  console.log(carIsBroken);
}

fixCar(carIsBroken, callCarOwner);