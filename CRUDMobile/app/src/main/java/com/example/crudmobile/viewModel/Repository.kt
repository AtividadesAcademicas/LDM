package com.example.crudmobile.viewModel

import com.example.crudmobile.roomDB.Pessoa
import com.example.crudmobile.roomDB.PessoaDatabase
import kotlinx.coroutines.flow.Flow

class Repository(private val db: PessoaDatabase) {
    suspend fun upsertPessoa(pessoa: Pessoa) {
        db.pessoaDao().upsertPessoa(pessoa)
    }

    suspend fun deletePessoa(pessoa: Pessoa) {
        db.pessoaDao().deletePessoa(pessoa)
    }

    fun getAllPessoas(): Flow<List<Pessoa>> {
        return db.pessoaDao().getAllPessoas()
    }
}