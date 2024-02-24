const gradeTableDefault = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"];
const scoreTableDefault = [90, 85, 80, 75, 70, 65, 60, 50];
const multiplierTableDefault = [4.00, 3.50, 3.00, 2.50, 2.00, 1.50, 1.00, 0.50, 0.00];

function uniqid(prefix = "") {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${`.${Math.trunc(Math.random() * 100000000)}`}`;
}

// University class definition
export class University {
    // Default values for university properties
    name;
    faculty;
    department;

    gpa;
    totalCredit;
    totalIncludedCredit;

    // Array to store terms
    terms = [];

    // For calculations
    gradeTable = gradeTableDefault;
    scoreTable = scoreTableDefault;
    multiplierTable = multiplierTableDefault;

    constructor(JSONData) {
        if (JSONData) {
            this.load(JSONData);
        }
    }

    setGradeTable(gradesArray) { this.gradeTable = gradesArray; this.terms.forEach(term => term.setGradeTable(gradesArray)); }
    setScoreTable(scoresArray) { this.scoreTable = scoresArray; this.terms.forEach(term => term.setScoreTable(scoresArray)); }
    setMultiplierTable(multipliersArray) { this.multiplierTable = multipliersArray; this.terms.forEach(term => term.setMultiplierTable(multipliersArray)); }
    setGradeTableDefault() { this.setGradeTable(gradeTableDefault); }
    setScoreTableDefault() { this.setScoreTable(scoreTableDefault); }
    setMultiplierTableDefault() { this.setMultiplierTable(multiplierTableDefault); }
    getGradeTable() { return this.gradeTable; }
    getScoreTable() { return this.scoreTable; }
    getMultiplierTable() { return this.multiplierTable; }

    addTerm(term) {
        if (term.name === undefined || term.name === null || term.name === "") {
            term.name = "Term " + (this.terms.length + 1);
        }
        term.setGradeTable(this.getGradeTable());
        term.setScoreTable(this.getScoreTable());
        term.setMultiplierTable(this.getMultiplierTable());
        this.terms.push(term);
    }

    getTermById(id) {
        return this.terms.find(term => term.id === id);
    }

    setTermById(id, newTerm) {
        const index = this.terms.findIndex(term => term.id === id);
        if (index !== -1) {
            this.terms[index] = newTerm;
        }
    }

    deleteTermById(id) {
        const index = this.terms.findIndex(term => term.id === id);
        if (index !== -1) {
            this.terms.splice(index, 1);
        }
    }

    getTerms() {
        return this.terms;
    }

    calc() {
        // calc for each child in each term
        this.terms.forEach(term => {
            term.courses.forEach(course => {
                course.calc();
            })
        })
        this.terms.forEach(term => { term.calc() });
        this.calcTotalCredit();
        this.calcGpa();
    }

    calcTotalCredit() {
        let totalCredit = 0;
        let totalIncludedCredit = 0;

        for (const term of this.terms) {
            if (term.includeCalc) {
                if (!isNaN(term.totalCredit)) {
                    totalCredit += Number(term.totalCredit);
                }
                if (!isNaN(term.totalIncludedCredit)) {
                    totalIncludedCredit += Number(term.totalIncludedCredit);
                }
            }
        }

        this.totalCredit = totalCredit;
        this.totalIncludedCredit = totalIncludedCredit;
    }

    calcGpa() {
        if (this.totalIncludedCredit === 0) {
            this.gpa = '';
        } else {
            let gpa = 0;
            for (const term of this.terms) {
                if (term.includeCalc) {
                    if (!isNaN(term.gpa)) {
                        gpa += Number(term.gpa) * Number(term.totalIncludedCredit);
                    }
                }
            }

            this.gpa = gpa / this.totalIncludedCredit;
        }
    }

    load(JSONData) {
        Object.keys(JSONData).forEach(key => {
            if (key !== "terms") {
                this[key] = JSONData[key];
            }
        })

        this.terms = [];

        JSONData.terms.forEach(term => {
            const newTerm = new Term();
            newTerm.load(term);
            newTerm.setGradeTable(this.getGradeTable());
            newTerm.setMultiplierTable(this.getMultiplierTable());
            newTerm.setScoreTable(this.getScoreTable());
            this.addTerm(newTerm);
        })
    }
}

// Term class definition
export class Term {
    name;
    id = uniqid();

    courses = [];

    totalCredit;
    totalIncludedCredit;
    gpa;

    includeCalc = true;
    autoCalc = true;
    expanded = true;

    gradeTable = gradeTableDefault;
    scoreTable = scoreTableDefault;
    multiplierTable = multiplierTableDefault;

    constructor(JSONData) {
        if (JSONData) {
            this.load(JSONData);
        }
    }

    setGradeTable(gradesArray) { this.gradeTable = gradesArray; this.courses.forEach(lesson => lesson.setGradeTable(gradesArray)); }
    setScoreTable(scoresArray) { this.scoreTable = scoresArray; this.courses.forEach(lesson => lesson.setScoreTable(scoresArray)); }
    setMultiplierTable(multipliersArray) { this.multiplierTable = multipliersArray; this.courses.forEach(lesson => lesson.setMultiplierTable(multipliersArray)); }
    getGradeTable() { return this.gradeTable; }
    getScoreTable() { return this.scoreTable; }
    getMultiplierTable() { return this.multiplierTable; }

    addCourse(course) {
        if (course.name === null || course.name === "" || course.name === undefined) {
            course.name = "Lesson " + (this.courses.length + 1);
        }
        course.setGradeTable(this.getGradeTable());
        course.setScoreTable(this.getScoreTable());
        course.setMultiplierTable(this.getMultiplierTable());
        this.courses.push(course);
    }

    getCourseById(id) {
        return this.courses.find(lesson => lesson.id === id);
    }

    setCourseById(id, newCourse) {
        const index = this.courses.findIndex(lesson => lesson.id === id);
        if (index !== -1) {
            this.courses[index] = newCourse;
        }
    }

    deleteCourseById(id) {
        const index = this.courses.findIndex(lesson => lesson.id === id);
        if (index !== -1) {
            this.courses.splice(index, 1);
        }
    }

    getCourses() {
        return this.courses;
    }

    getLastCourse() {
        return this.courses[this.courses.length - 1];
    }

    reorderCourses(orderArray) {
        this.courses = this.courses.sort((a, b) => orderArray.indexOf(a.id) - orderArray.indexOf(b.id));
    }

    calc() {
        this.calcTotalCredit();
        if(this.autoCalc) {
            this.calcGpa();
        }
    }

    calcTotalCredit() {
        let totalCredit = 0;
        let totalIncludedCredit = 0;
        for (const course of this.courses) {
            if (!isNaN(course.credit) && course.includeCalc) {
                totalCredit += Number(course.credit);
                if (!course.inactive) {
                    totalIncludedCredit += Number(course.credit);
                }else if(!course.autoCalcGrade && this.gradeTable.find(grade => grade === course.grade)) {
                    totalIncludedCredit += Number(course.credit);
                }
            }
        }
        this.totalCredit = totalCredit;
        this.totalIncludedCredit = totalIncludedCredit;
    }

    calcGpa() {
        if (this.totalIncludedCredit === 0) {
            this.gpa = '';
        } else {
            let gpa = 0;
            for (const course of this.courses) {
                if (!isNaN(course.credit) && course.includeCalc) {
                    gpa += Number(course.credit * course.multiplier);
                }
            }
            this.gpa = gpa / this.totalIncludedCredit;
        }
    }

    load(JSONData) {
        Object.keys(JSONData).forEach(key => {
            if (key !== "courses") {
                this[key] = JSONData[key];
            }
        })

        this.courses = [];

        JSONData.courses.forEach(course => {
            const newCourse = new Course();
            newCourse.load(course);
            this.addCourse(newCourse);
        })
    }
}

// Course class definition
export class Course {
    name;
    credit;
    id = uniqid();
    termId;

    scores = [];

    score;
    grade;
    multiplier;
    totalPercentage;

    autoCalcScore = true;
    autoCalcGrade = true;
    includeCalc = true;
    expanded = true;

    inactive = false;

    gradeTable = gradeTableDefault;
    scoreTable = scoreTableDefault;
    multiplierTable = multiplierTableDefault;

    constructor(JSONData) {
        if (JSONData) {
            this.load(JSONData);
        }
    }

    setGradeTable(gradesArray) { this.gradeTable = gradesArray; }
    setScoreTable(scoresArray) { this.scoreTable = scoresArray; }
    setMultiplierTable(multipliersArray) { this.multiplierTable = multipliersArray; }
    getGradeTable() { return this.gradeTable; }
    getScoreTable() { return this.scoreTable; }
    getMultiplierTable() { return this.multiplierTable; }

    setTermId(termId) { this.termId = termId; }

    addScore(score) {
        if (score.name === null || score.name === "" || score.name === undefined) {
            score.name = "Score " + (this.scores.length + 1);
        }
        this.scores.push(score);
    }

    getScoreById(id) {
        return this.scores.find(score => score.id === id);
    }

    setScoreById(id, newScore) {
        const index = this.getScoreIndexById(id);
        if (index !== -1) {
            this.scores[index] = newScore;
        }
    }

    deleteScoreById(id) {
        const index = this.scores.findIndex(grade => grade.id === id);
        if (index !== -1) {
            this.scores.splice(index, 1);
        }
    }

    getScores() {
        return this.scores;
    }

    calc() {
        this.calcTotalPercentage();
        if(this.autoCalcScore) {
            this.calcScore();
        }
        if(this.autoCalcGrade) {
            this.calcGrade();
        }
        this.calcMultiplier();
    }

    calcTotalPercentage() {
        this.totalPercentage = this.scores.reduce((a, b) => a + Number((b.score === null || b.score === "" || b.score === undefined || b.percentage === null || b.percentage === "" || b.percentage === undefined ? 0 : b.percentage)), 0);
        this.inactive = this.totalPercentage === 0;
    }

    calcScore() {
        if (this.inactive) {
            this.score = '';
            return;
        }
        this.score =(this.scores.reduce((a, b) => a + Number((b.score === null || b.score === "" || b.score === undefined || b.percentage === null || b.percentage === "" || b.percentage === undefined ? 0 : Number(b.score) * Number(b.percentage))), 0) / this.totalPercentage);  
    }

    calcGrade() {
        if (this.inactive) {
            this.grade = '';
            return;
        }
        for (let i = 0; i < this.gradeTable.length; i++) {
            if (this.score >= this.scoreTable[i]) {
                this.grade = this.gradeTable[i];
                return;
            }
        }
        this.grade = this.gradeTable[this.gradeTable.length - 1];
    }

    calcMultiplier() {
        for (let i = 0; i < this.gradeTable.length; i++) {
            if (this.grade === this.gradeTable[i]) {
                this.multiplier = this.multiplierTable[i];
                return;
            }
        }
        if (this.inactive) {
            this.multiplier = '';
            return;
        }
        this.multiplier = this.multiplierTable[this.multiplierTable.length - 1];
    }

    load(JSONData) {
        Object.keys(JSONData).forEach(key => {
            if (key !== "scores") {
                this[key] = JSONData[key];
            }
        })

        this.scores = [];
        JSONData.scores.forEach(score => {
            this.addScore(new Score(score));
        })
    }
}

// Score class definition
export class Score {
    name;
    id = uniqid();
    courseId;
    termId;

    score;
    percentage;

    constructor(JSONData) {
        if (JSONData) {
            this.load(JSONData);
        }
    }

    load(JSONData) {
        Object.keys(JSONData).forEach(key => {
            this[key] = JSONData[key];
        })
    }
}