const input = document.getElementById("answer-input");

export default function inputToHiragana() {
    const text = input.value;
    wanakana.toHiragana(text);
}
