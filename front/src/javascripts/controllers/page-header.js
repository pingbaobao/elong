import page_header_template from '../views/page-header.html';

const render = (data = {
    title: '',
    description: '',
    list: []
}) => {
    let _html = template.render(page_header_template, data);
    $('#page-header').html(_html);
}

export default {
    render
}