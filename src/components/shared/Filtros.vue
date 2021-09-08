<template>
    <div class="container-filtros">
        <div class="title">
            <span>Tarefas</span>
            <img
                src="../../assets/images/filtro.svg"
                alt="Filtrar tarefas" />
            <div class="form">
                <div>
                    <label>Data prevista de conclusão de:</label>
                    <input type="date" :value="periodoDe"
                        @input="$emit('setPeriodoDe', $event.target.value)"/>
                </div>
                <div>
                    <label>até:</label>
                    <input type="date" :value="periodoAte"
                        @input="$emit('setPeriodoAte', $event.target.value)"/>
                </div>
                <div class="line" />
                <div>
                    <label>Status:</label>
                    <select :value="status"
                        @input="$emit('setStatus', $event.target.value)">
                        <option value="0">Todas</option>
                        <option value="1">Ativas</option>
                        <option value="2">Concluídas</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="filtrosMobile" v-if="showFiltros">
            <div>
                <label>Período de:</label>
                <input type="date" :value="periodoDe"
                    @input="$emit('setPeriodoDe', $event.target.value)"/>
            </div>
            <div>
                <label>Período até:</label>
                <input type="date" :value="periodoAte"
                    @input="$emit('setPeriodoAte', $event.target.value)"/>
            </div>
            <div>
                <label>Status:</label>
                <select :value="status"
                    @input="$emit('setStatus', $event.target.value)">
                    <option value="0">Todas</option>
                    <option value="1">Ativas</option>
                    <option value="2">Concluídas</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showFiltros : false,
        }
    },
    props : {
        periodoDe : '',
        periodoAte : '',
        status : 0,
    }
}
</script>