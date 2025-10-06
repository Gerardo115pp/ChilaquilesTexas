/**
 * @type {import('./$types').PageLoad}
 */
export function load(load_data) {
    const lang = load_data.params.lang;
    console.log(load_data);

    const work_in_progress_label = lang === 'es' ? "Ya Merito!" : 
    "Los Chilaquiles is fixin' to bring the flavor to Houston SOON!";

    return {
        work_in_progress_label
    }
}