const button = document.querySelector("#btn");
button.addEventListener("click", calculateBac);

const selectGender = document.querySelector("#gender");
selectGender.addEventListener("change", showGender);

function showGender(e) {
   e.preventDefault();
   gender.style.display = "block"
}

function calculateBac(e) {
   e.preventDefault();
   const gender = document.querySelector("#gender").value;
   const weight = document.querySelector("#weight").value;
   const beer = document.querySelector("#beer").value;
   const wine = document.querySelector("#wine").value;
   const shot = document.querySelector("#shot").value;
   const time = document.querySelector("#time").value;


   if (weight === "" || weight <= 0) {
      Swal.fire({
         icon: 'error',
         title: 'Error!',
         text: 'Please enter your information!',
      })
   } else if (isNaN(beer) || isNaN(wine) || isNaN(shot) || isNaN(time) || isNaN(weight)) {


      Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'You have to enter a number!',
      })
      return false
   }


   let beerAlcoholContent = 0.06; /* средняя крепость пива 6%*/

   let wineAlcoholContent = 0.12; /* средняя крепость вина 12%*/

   let shotAlcoholContent = 0.4; /* средняя крепость крепких напитков 40%*/

   let absortion = 0.789; /* формула=количество единиц алкоголя = количество (литры) х крепость (%) х 0,789/ 1 mL ethanol = 0.789 grams ethanol*/

   /*  каждый час вычитается по 0,15 промилле*/
   let timePass = 0.15;

   /* формула, разработанная шведским химиком Эриком Видмарком*/
   let totalAlcochol = ((beer * beerAlcoholContent) + (wine * wineAlcoholContent) + (shot * shotAlcoholContent));
   let totalPureAlcochol = (totalAlcochol * absortion);
   let genderWeight = (gender * weight);
   let result = ((totalPureAlcochol / genderWeight) - (time* timePass));

   /* bac этот граммы алкоголя на 100 мл крови, а не на 1 литр, как промилле*/
   let bac = result / 10;
   /*  каждый час вычитаем по 0,15 промилле, и через какое-то количество часов вы получите значение, соответствующее допустимому для вождения*/
   let timeDrive = (result / 0.15)*60;
   
   /* преобразовываю минуты в чассы и минуты*/
   let   timeDriveHours = Math.trunc(timeDrive/60);
   let  timeDriveMinutes = timeDrive % 60;

   result = result.toFixed(2);
   document.querySelector("#total").textContent = result;

   bac = bac.toFixed(2);
   document.querySelector("#bac").textContent = bac;

   timeDriveHours = timeDriveHours.toFixed(0);
   document.querySelector("#timeDrive").textContent = timeDriveHours;
   timeDriveMinutes = timeDriveMinutes.toFixed(0);
   document.querySelector("#timeDriveMinutes").textContent = timeDriveMinutes;

   if (timeDriveHours < 0 || timeDriveMinutes<0 || result < 0 || bac < 0) {
      document.querySelector("#timeDrive").textContent = 0;
      document.querySelector("#timeDriveMinutes").textContent = 0;
      document.querySelector("#bac").textContent = 0;
      document.querySelector("#total").textContent = 0;
  }

}