var letters;
var grades;
var multipliers;

// University class definition
window.University =  class University {
    // Default values for university properties
    name = "My University";
    faculty = "My Faculty";
    department = "My Department";

    // Array to store semesters
    semesters = [];

    constructor(name, faculty, department) {
        if (name !== null && name !== "") {
            this.name = name;
        }
        if (faculty !== null && faculty !== "") {
            this.faculty = faculty;
        }
        if (department !== null && department !== "") {
            this.department = department;
        }

        letters = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"];
        grades = [90, 85, 80, 75, 70, 65, 60, 50];
        multipliers = [4.00, 3.50, 3.00, 2.50, 2.00, 1.50, 1.00, 0.50, 0.00];
    }

    // Method to add a new semester
    addSemester() {
        this.semesters.push(new Semester());
    }

    average() {
        const totalCredit = this.semesters.reduce((a, b) => a + (b.active ? b.totalCredit() : 0), 0);

        if (totalCredit === 0) {
            return 0;
        } else {
            return (this.semesters.reduce((a, b) => a + (b.average() * (b.active ? b.totalCredit() : 0)), 0) / totalCredit);
        }
    }
}

// Semester class definition
class Semester {
    name = "New Term";
    active = true;
    expanded = false;

    lessons = [];

    // Method to add a new lesson to the semester
    addLesson(name, credit) {
        if (name === null || name === "") {
            name = "Lesson " + (this.lessons.length + 1);
        }
        if (credit === null || credit === "") {
            credit = 0;
        }
        this.lessons.push(new Lesson(name, credit));
    }

    // Method to calculate the average grade for the semester
    average() {
        const totalCredit = this.lessons.reduce((a, b) => a + b.credit, 0);

        if (totalCredit === 0) {
            return 0;
        } else {
            return (this.lessons.reduce((a, b) => a + (b.multiplier() * b.credit), 0) / totalCredit);
        }
    }

    totalCredit() {
        return this.lessons.reduce((a, b) => a + b.credit, 0);
    }
}

// Lesson class definition
class Lesson {
    name;
    credit;
    grades = [];

    expanded = false;

    constructor(name, credit) {
        this.name = name;
        this.credit = credit;
    }

    // Method to add a new grade to the lesson
    addGrade(name, percentage) {
        this.grades.push(new Grade(name, percentage));
    }

    // Method to calculate the average grade for the lesson
    average() {
        const totalPercentage = this.grades.reduce((a, b) => a + (isNaN(b.value) ? 0 : b.percentage), 0);

        if (totalPercentage === 0) {
            return 0;
        } else {
            return (this.grades.reduce((a, b) => a + (isNaN(b.value) ? 0 : b.value * b.percentage), 0) / totalPercentage);
        }
    }

    letterNote() {
        for (let i = 0; i < letters.length; i++) {
            if (this.average() >= grades[i]) {
                return letters[i];
            }
        }
        return letters[letters.length - 1];
    }

    multiplier() {
        for (let i = 0; i < letters.length; i++) {
            if (this.average() >= grades[i]) {
                return multipliers[i];
            }
        }
        return multipliers[multipliers.length - 1];
    }
}

// Grade class definition
class Grade {
    name;
    value;
    percentage;

    constructor(name, percentage) {
        this.name = name;
        this.percentage = percentage;
    }
}

/*

let uni = new University();

uni.addSemester();
uni.addSemester();

uni.semesters[0].addLesson("Math", 2);
uni.semesters[1].addLesson("Turkish", 1);


console.log(uni.semesters[0].lessons[0].name);

uni.semesters[0].lessons[0].addGrade("final", 50);
uni.semesters[0].lessons[0].addGrade("vize1", 25);
uni.semesters[0].lessons[0].addGrade("vize2", 25);

uni.semesters[0].lessons[0].grades[0].value = 100;
uni.semesters[0].lessons[0].grades[1].value = 80;
uni.semesters[0].lessons[0].grades[2].value = 80;

uni.semesters[1].lessons[0].addGrade("final", 50);
uni.semesters[1].lessons[0].addGrade("vize1", 25);
uni.semesters[1].lessons[0].addGrade("vize2", 25);

uni.semesters[1].lessons[0].grades[0].value = 80;
uni.semesters[1].lessons[0].grades[1].value = 40;
uni.semesters[1].lessons[0].grades[2].value = 40;

console.log(uni.semesters[0].lessons[0].average());
console.log(uni.semesters[0].lessons[0].letterNote());
console.log(uni.semesters[0].lessons[0].multiplier());
console.log(uni.semesters[0].average());
console.log(uni.average());

uni.save();

/*
(async () => {
    let uni = new University();

    // Call the load method without a callback using async/await
    await uni.load("My University");

    // Use the loaded uni object or perform other operations...
    console.log(uni.semesters[0].lessons[0].average());
})();
*/
