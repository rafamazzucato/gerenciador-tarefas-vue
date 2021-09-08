<template>
    <div class="input">
        <img :src="require('../../assets/images/' + srcImg + '')" :alt="altImg" />
        <input :type="inputType" :name="inputName" :placeholder="inputPlaceholder" :value="value" @input="$emit('input', $event.target.value)"/>
    </div>
</template>

<script>
export default {
    props : {
        srcImg : '',
        altImg : '',
        inputType : '',
        inputName : '',
        inputPlaceholder : '',
        value: {
            required: true,
        },
    }
}
</script>