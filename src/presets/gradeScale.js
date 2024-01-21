const gradeTableDefault = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"];
const scoreTableDefault = [90, 85, 80, 75, 70, 65, 60, 50];
const multiplierTableDefault = [4.00, 3.50, 3.00, 2.50, 2.00, 1.50, 1.00, 0.50, 0.00];

const gradeTableA = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "F"];
const scoreTableA = [90, 85, 80, 75, 70, 60, 50];
const multiplierTableA = [4.00, 3.50, 3.00, 2.50, 2.00, 1.50, 1.00, 0.00];

const gradeTableB = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D", "F3"];
const scoreTableB = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
const multiplierTableB = [4.00, 3.75, 3.50, 3.25, 3.00, 2.75, 2.50, 2.25, 2.00, 1.75, 0.00];

const scoreTableC = [88, 81, 74, 67, 60, 53, 46, 39];

const gradeTableD = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
const scoreTableD = [96, 92, 88, 84, 80, 75, 70, 65, 60, 55];
const multiplierTableD = [4.00, 3.70, 3.30, 3.00, 2.70, 2.30, 2.00, 1.70, 1.30, 1.00, 0.00];

const scoreTableE = [90, 80, 70, 60, 50, 40, 30, 20];

const presets = [
    {
        name: " Default Grade Scale",
        search: ["default"],
        gradeTable: gradeTableDefault,
        scoreTable: scoreTableDefault,
        multiplierTable: multiplierTableDefault
    },
    {
        name: "Bilkent University",
        search: ["bilkent"],
        gradeTable: gradeTableD,
        scoreTable: scoreTableD,
        multiplierTable: multiplierTableD
    },
    {
        name: "Bogazici University",
        search: ["boun", "bogazici"],
        gradeTable: gradeTableA,
        scoreTable: scoreTableA,
        multiplierTable: multiplierTableA
    },
    {
        name: "Dokuz Eylül University",
        search: ["deu", "deü"],
        gradeTable: gradeTableDefault,
        scoreTable: scoreTableDefault,
        multiplierTable: multiplierTableDefault
    },
    {
        name: "Ege University",
        search: ["ege"],
        gradeTable: gradeTableDefault,
        scoreTable: scoreTableC,
        multiplierTable: multiplierTableDefault
    },
    {
        name: "Hacettepe University",
        search: ["hacettepe"],
        gradeTable: gradeTableB,
        scoreTable: scoreTableB,
        multiplierTable: multiplierTableB
    },
    {
        name: "Middle East Technical University",
        search: ["metu", "odtü", "odtu"],
        gradeTable: gradeTableDefault,
        scoreTable: scoreTableDefault,
        multiplierTable: multiplierTableDefault
    },
    {
        name: "Yeditepe University",
        search: ["yeditepe"],
        gradeTable: gradeTableA,
        scoreTable: scoreTableA,
        multiplierTable: multiplierTableA
    },
    {
        name: "Yildiz Technical University",
        search: ["yildiz", "ytü", "ytu"],
        gradeTable: gradeTableDefault,
        scoreTable: scoreTableE,
        multiplierTable: multiplierTableDefault
    }
]

presets.sort((a, b) => a.name.localeCompare(b.name));

export default presets;