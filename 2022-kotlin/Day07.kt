package weekone

import com.fasterxml.jackson.databind.ObjectMapper

class DaySeven {
    private val mapper = ObjectMapper()

    fun partOne(list: List<String>): Long {
        val actions = list.toActions()
        val pathToSizeMap = getFileMap(actions)
        println(mapper.writeValueAsString(pathToSizeMap))

        return pathToSizeMap.filterValues { it <= 100000 }.values.sum()
    }

    fun partTwo(list: List<String>): Long {
        val actions = list.toActions()
        val pathToSizeMap = getFileMap(actions)
        val totalSpace = 70_000_000L
        val requiredSpace = 30_000_000L
        val neededSpace = requiredSpace - (totalSpace - pathToSizeMap[""]!!)

        println(mapper.writeValueAsString(pathToSizeMap))
        return getOptimalDeleteFileSize(pathToSizeMap, neededSpace)
    }

    private fun getFileMap(actions: List<Action>): Map<String, Long> {
        var currentDirectory = ""
        val pathToSizeMap = mutableMapOf<String, Long>()
        actions.forEach { action ->
            when {
                action.command.isBackToRootCommand() -> currentDirectory = ""
                action.command.isBackUpCommand() -> {
                    val toList = currentDirectory.split(".")
                    val new = toList.subList(0, toList.size - 1).joinToString(".")
                    currentDirectory = new
                }
                action.command.isListCommand() -> {
                    action.results.forEach { result ->
                        if (result.isDirectory()) {
                            val directoryName = result.split(" ").last()
                            val path = if(currentDirectory.isBlank()) directoryName else "$currentDirectory.$directoryName"
                            val currentValue = pathToSizeMap[path] ?: 0L
                            pathToSizeMap[path] = 0L + currentValue
                        } else {
                            val fileSize = result.split(" ")[0].toLong()
                            val splitUp = currentDirectory.split(".")
                            if (currentDirectory != "") {
                                val rootCurrent = pathToSizeMap[""] ?: 0L
                                pathToSizeMap[""] = rootCurrent + fileSize
                            }
                            ( 1.. splitUp.size).forEach {
                                val tempDirectory = splitUp.subList(0, it).joinToString(".")
                                val tempCurrent = pathToSizeMap[tempDirectory] ?: 0L
                                pathToSizeMap[tempDirectory] = tempCurrent + fileSize
                            }
                        }
                    }
                }
                else -> {
                    val newPath = action.command.substring(5, action.command.length)
                    currentDirectory = if(currentDirectory.isBlank()) newPath else "$currentDirectory.$newPath"
                }
            }
        }
        return pathToSizeMap.toMap()
    }

    private fun getOptimalDeleteFileSize(map: Map<String, Long>, neededSpace: Long): Long {
        var minValue = Long.MAX_VALUE
        var minKey = ""
        val filtered = map.filterValues { it > neededSpace }
        filtered.entries.forEach {
            val remaining = (neededSpace - it.value) * -1
            if (remaining in 1 until minValue) {
                minValue = remaining
                minKey = it.key
            }
        }

        return map[minKey] ?: 0L
    }

    private fun String.isCommand(): Boolean = this.substring(0, 1) == "$"

    private fun String.isListCommand(): Boolean = this.substring(0, 4) == """$ ls"""

    private fun String.isBackToRootCommand(): Boolean = this.length > 4 && this == """$ cd /"""

    private fun String.isBackUpCommand(): Boolean =  this.length > 4 && this == """$ cd .."""

    private fun String.isDirectory(): Boolean = this.substring(0, 3) == "dir"

    data class Action(val command: String, val results: List<String>)

    private fun List<String>.toActions(): List<Action> {
        var actionIndex = 0
        val actionsList = mutableListOf<Action>()
        this.forEachIndexed { index, s ->
            if (s.isCommand()) {
                val subList = this.subList(index + 1, this.size)
                val results = subList.takeWhile { !it.isCommand() }
                val new = Action(s, results)
                actionsList.add(actionIndex, new)
                actionIndex += 1
            }
        }
        return actionsList.toList()
    }
}
