// functions
function scaleFontSize() {
    var items = document.getElementsByTagName("LI");

    for (i = 0; i < items.length; i++) {
        var name_len = items[i].innerHTML.length;
        var font_size = Math.ceil(Math.min((window.innerWidth / 4) / name_len, 24));
        console.log(font_size);
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
        sides[output[item_order.indexOf("side")]][0] + ", and " +
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
    "Tajin",
    "red pepper flakes",
    "tea leaves",
    "garlic",
    "Samyang Korean HOT Spicy Noodle Fire Chicken Flavor packet",
    "jalapeno",
    "lemon zest",
    "capers",
    "crushed elote chips",
    "shredded coconut"]

var sauces = [
    "lemon juice",
    "lime juice",
    "tabasco",
    "Sriracha",
    "fish sauce",
    "chimichurri",
    "mustard",
    "cream cheese",
    "berry jam",
    "red bean"]

var vehicles = [
    ["sourdough bread", "Loaf"],
    ["egg", "Rebirth"],
    ["prosciutto", "Butcher"],
    ["egg tofu", "Slab"],
    ["havarti", "Clover"],
    ["salmon", "Swim"],
    ["bagel", "Brunch"],
    ["fried chicken", "Roost"],
    ["soup", "Broth"],
    ["ramen", "Midnight Snack"],
    ["steak", "Filet"],
    ["chicken", "Hen"],
    ["pasta", "Carbohydrates"],
    ["pizza", "Flatbread"],
    ["curry", "Curr-tain Call"],
    ["mussels", "Crustacean"],
    ["puff pastry", "Puff"],
    ["salad", "Garden"],
    ["scallion pancake", "Allium"],
    ["pierogi", "Bag"],
    ["meatball", "Globe"]
]

var sides = [
    ["kimchi", "Invigorating"],
    ["pineapple", "Juicy"],
    ["elote", "Crunchy"],
    ["platha", "Flaky"],
    ["plain frozen yogurt", "COLD"],
    ["mangosteen", "Sweet"],
    ["durian", "Aromatic"],
    ["shrimp chips", "Seaside"],
    ["dragonfruit", "Prickly"],
    ["grapefruit", "Tart"],
    ["salami", "Pig’s"],
    ["popover", "Fluffy"],
    ["goat cheese", "Creamy"],
    ["burrata", "Spherical"]
]

var drinks = [
    "chamoyada",
    "tequila",
    "plum wine",
    "soju",
    "Taiwan beer",
    "LA burdick's hot chocolate",
    "grapefruit juice",
    "grapefruit beer",
    "La Colombe cold brew"
]

var vehicle_adjs = [
    "Poached",
    "Sauteed",
    "Roasted",
    "Griddled",
    "Grilled",
    "Pan-fried",
    "Boiled",
    "Steamed",
    "Toasted",
    "Deconstructed",
    "Smoked"
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
    "accented with the essence of",
    "graced with a dash of",
    "finished with a hint of",
    "sprinkled with",
    "topped with a touch of",
    "buried under",
    "lightly dusted with"
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
    "all washed down with",
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
