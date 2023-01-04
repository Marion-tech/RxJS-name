import './style.css';

import { of, map, Observable, filter, interval } from 'rxjs';
import { Person, shortDescription } from './models/person';
import { firstNames, names } from './models/data';

function generateRandomUser(size: number): Person[] {
  var users: Person[] = [];
  for (var i = 0; i < size; i++) {
    users.push({
      name: names[getRandomInt(names.length)],
      firstName: firstNames[getRandomInt(firstNames.length)],
      dateOfBirth: new Date(
        `${getRandomInt(122, 1900)}-${getRandomInt(12, 1)}-${getRandomInt(
          28,
          1
        )}`
      ),
      size: getRandomInt(90, 120),
      weight: getRandomInt(80, 40),
    });
  }
  return users;
}

function getRandomInt(max, start = 0) {
  return start + Math.floor(Math.random() * max);
}

function dateToString(date: Date) {
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

// Ici on génère le nombre d'utilisateur aléatoire
var responseHttp: Observable<Person[]> = of(generateRandomUser(10));
responseHttp.subscribe((res: Person[]) =>
  console.log('Subscribe de Person', res)
);

// Comprendre les observables

// que va faire cette observable une fois résolu
responseHttp
  .pipe(
    map((persons: Person[]) =>
      persons.map(
        (person) =>
          `${person.firstName} ${person.name} est né(e) le ${dateToString(
            person.dateOfBirth
          )}`
      )
    )
  )
  .subscribe((res: []) => console.log('exo1 /', res));
// renvoi une liste de 10 Personnes :
// -> Prénoms, Noms est né(e) le Jour - Mois - Année

// que va faire cette observable une fois résolu
responseHttp.pipe(
  filter((persons: Person[]) => {
    return !!persons.find((person) => person.size > 205);
  }),
  map((persons: Person[]) => {
    return persons.filter(
      (person) =>
        (person.size < 190 && person.size > 180) ||
        (person.weight > 80 && person.weight < 120)
    );
  })
);
// ?????


var obs = interval(1000);
//obs.subscribe(res => console.log("timer", res))
obs
  .pipe(filter((x) => x % 2 === 1))
  //.subscribe((res) => console.log('timer avec filter', res));

// Première étape: les tris

/*
 **
 ** 1°) Trier la liste par la taille
 **
 */
responseHttp.pipe(
  map((triTaille : Person[]) =>{
    return triTaille.sort((a, b) => a.size > b.size ? 1 : -1)
  }))
  .subscribe((res:Person[]) => console.log('exo2 / tri taille', res));
  //console.log('tri taille', ex1);




/*
 **
 ** 2°) Trier la liste par le nom
 **
 */

responseHttp.pipe(
  map((triNom : Person[]) => {
    return triNom.sort((a, b) => a.name > b.name ? 1 : -1)
  }))
  .subscribe((res: Person[]) => console.log('exo 3 / Tri nom', res) )

/*
 **
 ** 3°) Trier la liste par la date de naissance
 **
 */

 responseHttp.pipe(
   map((triDoB : Person[]) => {
     return triDoB.sort((a, b) => a.dateOfBirth > b.dateOfBirth ? 1 : -1)
   }))
   .subscribe((res: Person[]) => console.log('exo 4 / Tri DoB', res))

 
/*
 **
 ** 4°) Trier la liste par le nom et prénom
 **
 */

 responseHttp.pipe(
   map((triNomPrenom : Person[]) => {
     return triNomPrenom.sort((a, b) => a.name+a.firstName > b.name+b.firstName ? 1 : -1)
   }))
   .subscribe((res : Person[]) => console.log('exo 5 / Tri Nom Prenom', res))

// deuxième étape, les filtres

/*
 **
 ** 1°) afficher uniquement les gens ayant une taille supérieur à 1m60
 **
 */

 responseHttp.pipe(
   map((filtTaille160 : Person[]) => {
     return filtTaille160.filter((taille: Person )=> taille.size > 160)
   }),
   map((filtTaille160 : Person[]) => {
    return filtTaille160.sort((a, b) => a.size > b.size ? 1 : -1);
  })
  ).subscribe((res : Person[]) => {
     console.log('exo 6/ taille 160cm ', res);
    })

/*
 **
 ** 2°) afficher uniquement les gens ayant une taille supérieur à 1m60 et pesant moins de 80kg
 **
 */

 responseHttp.pipe(
   map((filt160 : Person[]) => {
     return filt160.filter((person: Person) => person.size > 160 || person.weight < 80)
   })
 ).subscribe((res : Person[]) => console.log(' exo 7/ taille > 160 poids -80kg', res))

/*
 **
 ** 3°) afficher uniquement les gens nés après le 15 janvier 1984
 **
 */
responseHttp.pipe(
  map((janv84 : Person[]) => {
    return janv84.filter((person: Person) => person.dateOfBirth > new Date('1984-01-15'))
  })
).subscribe((res: Person[]) => console.log('exo 8/ après 15 Janvier 1984', res) )


/*
 **
 ** 4°) afficher uniquement les 20 dernières personnes de la liste
 **
 */

responseHttp.pipe(
  map((last20:Person[]) => {
   return last20.slice(-5)
  })
).subscribe((res : Person[]) => console.log(' exo 9/ last 5', res));

// troisème étape, la transformation de données

/*
 **
 ** 1°) créer une nouvelle liste ne comprenant que le nom et le prénom
 **
 */

responseHttp.pipe(
  map((listNP:Person[]) => {
    return listNP.map((liste:Person) => liste.name + ' ' + liste.firstName)
  })
).subscribe((res: string[]) => console.log('liste nom prenom', res));

/*
**
** 2°) créer une nouvelle liste contenant que les gens de plus d'1m84 et sous le format nom, prenom, age (et non pas date de naissance)
Cela correspondra à l'interface 'shortDescription' écrite dans le fichier interface.ts
**
*/

/*responseHttp.pipe(
  map((list184:Person[]) => {
    return list184.map((liste:Person) => liste.name + ' ' + liste.firstName + ' '+ liste.age).filter((person184:shortDescription) => person184.size > 184)
  })
).subscribe((res: Person) => console.log('liste short 184', res))
*/


/*
 **
 ** 3°) créer une nouvelle liste suivant l'interface 'longDescription' permettant de transformer la 'size' en un string de la forme "1m22" pour un number comme "122"
 **
 */

/*
 **
 ** 4°) créer une nouvelle liste suivant l'interface 'completeDescription'
 **
 */

// Maintenant les petites fonctions amusantes que tu aimes tant :D

// Détecter si des personnes dans la liste ont + de 70 ans et retourner le nombre de personne trouvées

// Détecter si des personnes dans la liste ont une taille comprise entre 1m60 et 1m80 et retourner le poids de ses personnes dans un ordre ascendant

// Détecter si des personnes dans la liste ont le même nom et retourner les noms en doublon

// Détecter si des personnes dans la liste ont le même prénom et retourner les prénoms en doublon

// Détecter si la liste présente une homonymie ou non ( pour rappel, une homonymie est deux personnes différentes mais ayant le même nom et prénom )
