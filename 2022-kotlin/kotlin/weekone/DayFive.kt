package weekone

class DayFive {
    fun partOne(list: List<String>): String {
        val plan = getShipPlan(list)
        val instructions = getInstructions(list)
        val map = setupMap(plan)

        return executeInstructions(instructions, map, true).readTops()
    }
    fun partTwo(list: List<String>): String {
        val plan = getShipPlan(list)
        val instructions = getInstructions(list)
        val map = setupMap(plan)

        return executeInstructions(instructions, map, false).readTops()
    }

    private fun setupMap(list: List<String>): MutableMap<Int, List<String>> {
        val map = mutableMapOf<Int, List<String>>()
        val maxLength = list.maxOf { it.length }
        (1..maxLength + 1 step 4).toList().forEachIndexed { index, i ->
            val tempList = list.mapNotNull {
                if (it.length > i && it[i].isLetter()) {
                    it[i].toString()
                } else null
            }
            map[index + 1] = tempList
        }
        return map
    }

    private fun getShipPlan(list: List<String>): List<String> {
        val emptyRowIndex = list.indexOfFirst { it.isBlank() }
        return list.take(emptyRowIndex - 1)    }

    private fun getInstructions(list: List<String>): List<String> {
        val emptyRowIndex = list.indexOfFirst { it.isBlank() }
        return list.takeLast(list.size - emptyRowIndex -1)
    }

    private fun executeInstructions(
        instructions: List<String>,
        map: MutableMap<Int, List<String>>,
        isReversed: Boolean,
    ): MutableMap<Int, List<String>> {
        instructions.forEach {
            val action = Action.from(it)
            val moving = map[action.from]!!.subList(0, action.move)
            val removing = map[action.from]!!.subList(action.move, map[action.from]!!.size)
            // move to new destination
            map[action.to] = if (isReversed) moving.reversed() + map[action.to]!! else  moving + map[action.to]!!
            // remove from old destination
            map[action.from] = removing
        }
        return map
    }

    private fun MutableMap<Int, List<String>>.readTops(): String {
        return this.values.joinToString("") { it.first() }
    }

    data class Action(
        val move: Int,
        val from: Int,
        val to: Int
    ){
        companion object {
            fun from(s: String): Action {
                val list = s.split("move", "from", "to")
                    .filter { it.isNotBlank() }
                    .map { it.trim().toInt() }
                return Action(list[0], list[1], list[2])
            }
        }
    }
}