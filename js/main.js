// functions
function scaleFontSize() {
    var items = document.getElementsByTagName("LI");

    for (i = 0; i < items.length; i++) {
        var name_len = items[i].innerHTML.length;
        var font_size = 400 / name_len;
        items[i].style.fontSize = String(font_size) + "px";
    }

}

function add_items(category, items) {
    var ul = document.getElementById(category);

    for (i = 0; i < items.length; i++) {
        var li = document.createElement("LI");
        var text = document.createTextNode(items[i]);
        li.appendChild(text);
        ul.appendChild(li);
    }
}

selected_item_idxs = []
function on_slot_end(num) {
    selected_item_idxs.push(Number(num));
}

function on_slot_finish(num) {
    // digits of number correspond with randomly selected items
    var item_order = ["seasoning", "sauce", "vehicle", "side", "drink"];

    // get selected items arr
    num_str = num.toString();
    output = []
    i = 0;
    while (i < num_str.length) {
        // check next two digits
        if (i < num_str.length - 1) {
            t_idx = Number(num_str.substring(i, i + 2));

            if (selected_item_idxs.indexOf(t_idx) != -1) {
                output.push(t_idx);
                selected_item_idxs.splice(selected_item_idxs.indexOf(t_idx), 1);
                i++;
            }
            else {
                output.push(Number(num_str[i]));
            }
        }
        else {
            output.push(Number(num_str[i]));
        }
        i++;
    }
    selected_item_idxs = [] // reset

    output = output.map(x => x - 1); // fix for 0-index

    // generate title
    var title = "The " + sides[output[item_order.indexOf("side")]][1] + " " + vehicles[output[item_order.indexOf("vehicle")]][1];
    console.log(title);

    // generate description
    // [vehicle adj] [vehicle] with a [sauce] [sauce adj], [side adj] [side]
    // and topped with [seasoning adj] [seasoning], [drink adj] [drink]
    var description =
        vehicle_adjs[Math.floor(Math.random() * vehicle_adjs.length)] + " " +
        vehicles[output[item_order.indexOf("vehicle")]][0] + " with a " +
        sauces[output[item_order.indexOf("sauce")]] + " " +
        sauce_nouns[Math.floor(Math.random() * sauce_nouns.length)] + ", " +
        side_adjs[Math.floor(Math.random() * side_adjs.length)] + " " +
        sides[output[item_order.indexOf("side")]][0] + ", and topped with " +
        seasoning_adjs[Math.floor(Math.random() * seasoning_adjs.length)] + " " +
        seasonings[output[item_order.indexOf("seasoning")]] + ", " +
        drink_adjs[Math.floor(Math.random() * drink_adjs.length)] + " " +
        drinks[output[item_order.indexOf("drink")]];

    console.log(description);

    // insert text into div
    var title_el = document.getElementById("title");
    title_el.innerHTML = title;
    var desc_el = document.getElementById("description");
    desc_el.innerHTML = description;

}

// data
var seasonings = [
    "salt",
    "pepper",
    "tajin",
    "red pepper flakes",
    "tea leaves",
    "garlic",
    "Samyang Korean HOT Spicy Noodle Fire Chicken Flavor packet",
    "Jalapeno",
    "lemon zest",
    "Capers",
    "Crushed elote chips",
    "shredded coconut"]

var sauces = [
    "lemon juice",
    "lime juice",
    "tabasco",
    "sriracha",
    "fish sauce",
    "chimichurri",
    "Mustard",
    "Cream cheese",
    "berry jam",
    "red bean"]

var vehicles = [
    ["sourdough bread", "loaf"],
    ["Egg", "rebirth"],
    ["Prosciutto", "butcher"],
    ["egg tofu", "slab"],
    ["Havarti", "clover"],
    ["Salmon", "swim"],
    ["Bagel", "brunch"],
    ["fried chicken", "roost"],
    ["Soup", "broth"],
    ["Ramen", "midnight snack"],
    ["Steak", "fillet"],
    ["Chicken", "hen"],
    ["Pasta", "carbohydrates"],
    ["Pizza", "flatbread"],
    ["Curry", "Curr-tain call"],
    ["Mussels", "crustacean"],
    ["puff pastry", "puff"],
    ["Salad", "garden"],
    ["Scallion pancake", "allium"],
    ["Pierogi", "bag"],
    ["Meatball", "globe"]
]

var sides = [
    ["Kimchi", "invigorating"],
    ["Pineapple", "juicy"],
    ["Elote", "crunchy"],
    ["Platha", "flaky"],
    ["plain frozen yogurt", "COLD"],
    ["Mangosteen", "sweet"],
    ["Durian", "aromatic"],
    ["shrimp chips", "seaside"],
    ["Dragonfruit", "prickly"],
    ["Grapefruit", "tart"],
    ["Salami", "pig’s"],
    ["Popover", "fluffy"],
    ["goat cheese", "creamy"],
    ["Burrata", "spherical"]
]

var drinks = [
    "chamoyada",
    "tequila",
    "plum wine",
    "soju",
    "taiwan beer",
    "LA burdick's hot chocolate",
    "grapefruit juice",
    "grapefruit beer",
    "la colombe cold brew"
]

var vehicle_adjs = [
    "poached",
    "sauteed",
    "roasted",
    "griddled",
    "grilled",
    "pan-fried",
    "boiled",
    "steamed",
    "toasted",
    "deconstructed",
    "smoked"
]

var sauce_nouns = [
    "reduction",
    "creme",
    "compote",
    "medley",
    "chutney",
    "jus",
    "dressing",
    "gravy",
    "drizzle",
    "spread",
    "dip"
]

var seasoning_adjs = [
    "the essence of",
    "a dash of",
    "a hint of",
    "a sprinkling of",
    "a touch of",
    "buried under",
    "a light dusting of"
]

var side_adjs = [
    "with a delicate heap of",
    "accompanied by",
    "presented alongside",
    "with a complementary",
    "paired with",
    "with a side of",
    "next to some",
    "with a mound of"
]

var drink_adjs = [
    "with a flute of",
    ", all washed down with",
    "paired with",
    "with a line of shots of",
    "with a crystal goblet of",
    "with a chalice of",
    "with chilled",
    "and a piping hot glass of"
]

// do stuff
add_items("seasoning", seasonings);
add_items("sauce", sauces);
add_items("vehicle", vehicles.map(x => x[0]));
add_items("side", sides.map(x => x[0]));
add_items("drink", drinks);

scaleFontSize();

// spin button
$('#btn-example1').click(function() {
    $('#example1 ul').playSpin({
        // return chosen value
        onFinish: function(num) {
            on_slot_finish(num);
        },
        onEnd: function(num) {
            on_slot_end(num);
        }
    });
});
