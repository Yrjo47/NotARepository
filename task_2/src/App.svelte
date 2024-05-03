<script lang="ts">
    import { onMount } from "svelte";

    let promise = fetchCurrenciesWithRatesToUSD();
    let currencies;

    async function fetchCurrenciesWithRatesToUSD() {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        currencies = data.rates;
    }

    function changeRatio() {
        ratio = currencies[currencyOne] / currencies[currencyTwo];
    }

    function evaluateFirst() {
        inputOne = Math.round((inputTwo / ratio) * 100) / 100;
    }

    function evaluateSecond() {
        inputTwo = Math.round(inputOne * ratio * 100) / 100;
    }

    let inputOne: number = 0;
    let inputTwo: number = 0;
    let currencyOne: string = "USD";
    let currencyTwo: string = "USD";
    let ratio: number = 1;
</script>

<main>
    {#await promise}
        <div id="loading-wrapper">
            <h1>Loading...</h1>
        </div>
    {:then}
        <div id="content-wrapper">
            <h1>Конвертер валют</h1>
            <div id="description-section">
                <p>
                    Данный сервис позволяет конвертировать валюты. Для
                    проведения расчета необходимо ввести сумму конвертации в
                    одно из полей и выбрать нужную валюту из списка. Затем
                    выберите валюту, в которую будет производиться конвертация.
                    Коэффициенты, с которыми были рассчитаны значения,
                    представлены числами оранжевого цвета. Расчитанное значение
                    округляется до тысячных долей. При изменении валюты в одном
                    из полей, значение в нем автоматически обновится. Будьте
                    внимательны!
                </p>
            </div>
            <div id="converter-section">
                <div class="input-block">
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        bind:value={inputOne}
                        on:input={evaluateSecond}
                    />
                    <select
                        name="currnecy1"
                        id="currency1-select"
                        bind:value={currencyOne}
                        on:change={changeRatio}
                        on:change={evaluateFirst}
                    >
                        {#each Object.keys(currencies) as currency}
                            <option value={currency}>{currency}</option>
                        {/each}
                    </select>
                </div>
                <div class="middle-block">
                    <span class="coefficient"
                        >x{Math.round(ratio * 1000) / 1000}</span
                    >
                    <svg
                        class="arrow-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 4V20M12 20L8 16M12 20L16 16"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <svg
                        class="arrow-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 4V20M12 4L8 8M12 4L16 8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="coefficient"
                        >x{Math.round((1 / ratio) * 1000) / 1000}</span
                    >
                </div>
                <div class="input-block">
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        bind:value={inputTwo}
                        on:input={evaluateFirst}
                    />
                    <select
                        name="currnecy2"
                        id="currency2-select"
                        bind:value={currencyTwo}
                        on:change={changeRatio}
                        on:change={evaluateSecond}
                    >
                        {#each Object.keys(currencies) as currency}
                            <option value={currency}>{currency}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {:catch err}
        <div id="error-wrapper">
            <h1>Ooops, something went wrong...</h1>
        </div>
    {/await}
</main>

<style>
    * {
        margin: 0;
    }

    main {
        width: 100%;
        min-height: 100vh;
        display: flex;
        place-content: center;
    }

    #content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
    }

    #description-section {
        width: 80%;
        max-width: 960px;
        margin-bottom: 72px;
    }

    #converter-section {
        width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    h1 {
        font-size: 68px;
        text-align: center;
        margin-bottom: 24px;
    }

    p {
        font-size: 14px;
        text-align: center;
    }

    input {
        font-size: 18px;
        height: 56px;
        padding: 0 8px;
        margin: 0;
        border: none;
        flex-grow: 1;
    }

    select {
        font-size: 18px;
        height: 56px;
        padding: 0 8px;
        border: none;
    }

    .input-block {
        display: flex;
        width: 100%;
        gap: 8px;
    }

    .middle-block {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .coefficient {
        font-size: 24px;
        font-weight: 600;
        color: rgb(255, 145, 0);
    }

    .arrow-svg {
        stroke: white;
        stroke-width: 2;
    }

    #loading-wrapper {
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #error-wrapper {
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
